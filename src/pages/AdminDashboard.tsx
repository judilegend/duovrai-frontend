import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

interface Order {
  id: string;
  email: string;
  partner1_name: string;
  partner2_name: string;
  status: "PENDING" | "PAID" | "COMPLETED" | "FAILED";
  amount: number;
  plan_type: "ESSENTIEL" | "PREMIUM";
  created_at: string;
  updated_at: string;
}

interface DashboardMetrics {
  total_orders: number;
  total_revenue: number;
  pending: number;
  paid: number;
  completed: number;
  failed: number;
  total: number;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const createWebSocketUrl = (token: string) => {
  const url = new URL(`${API_BASE_URL}/api/v1/admin/orders/ws`);
  url.protocol = url.protocol.replace("http", "ws");
  url.searchParams.set("token", token);
  return url.toString();
};

const statusLabel = (status: Order["status"]) => {
  switch (status) {
    case "PENDING":
      return "Attente";
    case "PAID":
      return "Payé";
    case "COMPLETED":
      return "Livré";
    case "FAILED":
      return "Échoué";
    default:
      return status;
  }
};

const statusStyle = (status: Order["status"]) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100/70 text-yellow-800";
    case "PAID":
      return "bg-green-100/70 text-green-800";
    case "COMPLETED":
      return "bg-blue-100/70 text-blue-800";
    case "FAILED":
      return "bg-red-100/70 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatDate = (value: string) => {
  const date = new Date(value);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (value: string) => {
  const date = new Date(value);
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function AdminDashboard() {
  const { user, accessToken, logout, isAuthenticated } = useAdminAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "orders">("overview");
  const [socketStatus, setSocketStatus] = useState<string>("Déconnecté");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const navigate = useNavigate();

  const fetchSummary = async () => {
    if (!accessToken) return;

    const response = await fetch(
      `${API_BASE_URL}/api/v1/admin/dashboard/summary`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        "Impossible de récupérer les statistiques du tableau de bord.",
      );
    }

    const data = await response.json();
    setMetrics(data);
  };

  const fetchOrders = async () => {
    if (!accessToken) return;

    const url = new URL(`${API_BASE_URL}/api/v1/admin/orders`);

    if (statusFilter) {
      url.searchParams.append("status_filter", statusFilter);
    }
    url.searchParams.append("limit", "50");

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        logout();
        navigate("/admin/login");
        return;
      }
      const data = await response.json().catch(() => ({}));
      throw new Error(data.detail || "Impossible de récupérer les commandes.");
    }

    const data = await response.json();
    setOrders(data.orders || []);
    if (data.metrics) {
      setMetrics(data.metrics);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!accessToken) return;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await Promise.all([fetchSummary(), fetchOrders()]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [accessToken, statusFilter, logout, navigate]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const wsUrl = createWebSocketUrl(accessToken);
    const ws = new WebSocket(wsUrl);
    socketRef.current = ws;
    setSocketStatus("Connexion...");

    ws.onopen = () => {
      setSocketStatus("Connecté");
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === "order_update") {
          fetchSummary();
          fetchOrders();
        }
        if (payload.type === "connected") {
          setSocketStatus("Connecté");
        }
      } catch {
        // Ignore invalid WebSocket payloads.
      }
    };

    ws.onclose = () => {
      setSocketStatus("Déconnecté");
    };

    ws.onerror = () => {
      setSocketStatus("Erreur de connexion");
    };

    return () => {
      ws.close();
      socketRef.current = null;
    };
  }, [accessToken, statusFilter]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#f9f3e3] font-sans relative overflow-hidden text-[#1A5C52]">
      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col min-h-screen">
        <nav className="sticky top-0 z-50 bg-white/95 px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-sm backdrop-blur-lg">
          <div className="flex items-center gap-2">
            <span
              className="font-bold text-2xl text-[#1A5C52] tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Duovrai
            </span>
            <span className="text-[10px] tracking-widest text-[#B8962E] font-bold uppercase">
              Admin
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-green-50 text-green-800 text-xs font-semibold">
              {user?.email || "Administrateur"}
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-[#1A5C52]/15 bg-white px-4 py-2 text-sm font-semibold text-[#1A5C52] shadow-sm transition hover:bg-[#1A5C52]/5"
            >
              Déconnexion
            </button>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 py-10 w-full flex-1 relative z-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 text-[10px] tracking-widest text-[#B8962E] font-bold uppercase mb-3">
                <span className="w-2 h-2 rounded-full bg-[#B8962E] shadow-[0_0_8px_rgba(184,150,46,0.4)]"></span>
                Tableau de bord
              </div>
              <h1
                className="text-4xl font-bold text-[#1A5C52]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Gestion des commandes
              </h1>
              <p className="mt-2 text-sm text-[#1A5C52]/70">
                Bienvenue {user?.full_name || "Admin"}, suivez les paiements,
                les statuts et les livraisons en temps réel.
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#1A5C52]/70">
              <span className="rounded-full bg-[#EEF6F1] px-3 py-1">
                Statut WebSocket : {socketStatus}
              </span>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab("overview")}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                activeTab === "overview"
                  ? "bg-[#1A5C52] text-white"
                  : "bg-white text-[#1A5C52] border border-[#1A5C52]/15"
              }`}
            >
              Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                activeTab === "orders"
                  ? "bg-[#1A5C52] text-white"
                  : "bg-white text-[#1A5C52] border border-[#1A5C52]/15"
              }`}
            >
              Commandes clients
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg">
              <p className="text-sm text-[#1A5C52]/70">Total des revenus</p>
              <p className="mt-4 text-3xl font-bold text-[#1A5C52]">
                {metrics?.total_revenue?.toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) ?? "0,00"}
                €
              </p>
            </div>
            <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg">
              <p className="text-sm text-[#1A5C52]/70">Commandes totales</p>
              <p className="mt-4 text-3xl font-bold text-[#1A5C52]">
                {metrics?.total_orders ?? 0}
              </p>
            </div>
            <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg">
              <p className="text-sm text-[#1A5C52]/70">Commandes affichées</p>
              <p className="mt-4 text-3xl font-bold text-[#1A5C52]">
                {orders.length}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg">
              <p className="text-sm text-[#1A5C52]/70">En attente</p>
              <p className="mt-4 text-3xl font-bold text-[#1A5C52]">
                {metrics?.pending ?? 0}
              </p>
            </div>
            <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg">
              <p className="text-sm text-[#1A5C52]/70">Payés</p>
              <p className="mt-4 text-3xl font-bold text-[#1A5C52]">
                {metrics?.paid ?? 0}
              </p>
            </div>
            <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg">
              <p className="text-sm text-[#1A5C52]/70">Livrés</p>
              <p className="mt-4 text-3xl font-bold text-[#1A5C52]">
                {metrics?.completed ?? 0}
              </p>
            </div>
          </div>

          {activeTab === "overview" ? (
            <div className="rounded-3xl border border-white/70 bg-white/90 p-8 shadow-xl mb-10">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#1A5C52]">
                    Résumé rapide
                  </h2>
                  <p className="mt-2 text-sm text-[#1A5C52]/70">
                    Ce tableau vous donne les indicateurs les plus importants :
                    revenus, commandes totales et statuts en temps réel.
                  </p>
                </div>
                <div className="rounded-full bg-[#E8F7EF] px-4 py-2 text-sm font-semibold text-[#166534]">
                  Données mises à jour en temps réel
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-[#E6F4ED] bg-[#F9FFF8] p-6">
                  <p className="text-sm text-[#1A5C52]/70">
                    Montant total encaissé
                  </p>
                  <p className="mt-4 text-3xl font-bold text-[#1A5C52]">
                    {metrics?.total_revenue?.toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) ?? "0,00"}
                    €
                  </p>
                </div>
                <div className="rounded-3xl border border-[#E6F4ED] bg-[#F9FFF8] p-6">
                  <p className="text-sm text-[#1A5C52]/70">
                    Nombre total de commandes
                  </p>
                  <p className="mt-4 text-3xl font-bold text-[#1A5C52]">
                    {metrics?.total_orders ?? 0}
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {error && (
            <div className="mb-8 rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
              {error}
            </div>
          )}

          {activeTab === "orders" && (
            <div className="rounded-3xl border border-white/70 bg-white/90 p-8 shadow-xl">
              <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#1A5C52]">
                    Commandes clients
                  </h2>
                  <p className="mt-2 text-sm text-[#1A5C52]/70">
                    Tous les dossiers clients et leurs statuts de paiement en
                    temps réel.
                  </p>
                </div>
                <div className="text-sm text-[#1A5C52]/70">
                  {orders.length} commande(s) affichée(s)
                </div>
              </div>

              <div className="mb-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setStatusFilter(null)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    !statusFilter
                      ? "bg-[#1A5C52] text-white"
                      : "bg-white text-[#1A5C52] border border-[#1A5C52]/15"
                  }`}
                >
                  Toutes
                </button>
                <button
                  onClick={() => setStatusFilter("PENDING")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    statusFilter === "PENDING"
                      ? "bg-yellow-500 text-white"
                      : "bg-white text-[#1A5C52] border border-[#1A5C52]/15"
                  }`}
                >
                  En attente
                </button>
                <button
                  onClick={() => setStatusFilter("PAID")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    statusFilter === "PAID"
                      ? "bg-green-500 text-white"
                      : "bg-white text-[#1A5C52] border border-[#1A5C52]/15"
                  }`}
                >
                  Payés
                </button>
                <button
                  onClick={() => setStatusFilter("FAILED")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    statusFilter === "FAILED"
                      ? "bg-red-500 text-white"
                      : "bg-white text-[#1A5C52] border border-[#1A5C52]/15"
                  }`}
                >
                  Annulés
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-[#1A5C52]/90">
                  <thead className="border-b border-[#CBD5E1] text-xs uppercase tracking-[0.12em] text-[#1A5C52]/60">
                    <tr>
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Client</th>
                      <th className="px-4 py-3">Prénoms</th>
                      <th className="px-4 py-3">Formule</th>
                      <th className="px-4 py-3">Montant</th>
                      <th className="px-4 py-3 text-right">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-12 text-center text-[#1A5C52]/70"
                        >
                          Chargement des commandes...
                        </td>
                      </tr>
                    ) : orders.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-12 text-center text-[#1A5C52]/70"
                        >
                          Aucune commande trouvée.
                        </td>
                      </tr>
                    ) : (
                      orders.map((order, index) => (
                        <tr
                          key={order.id}
                          className="border-b border-[#E2E8F0] hover:bg-[#F0FBF6] transition-colors"
                        >
                          <td className="px-4 py-5 font-semibold">
                            {index + 1}
                          </td>
                          <td className="px-4 py-5">
                            <div className="font-semibold">
                              {formatDate(order.created_at)}
                            </div>
                            <div className="text-xs text-[#1A5C52]/60">
                              {formatTime(order.created_at)}
                            </div>
                          </td>
                          <td className="px-4 py-5">{order.email}</td>
                          <td className="px-4 py-5">
                            {order.partner1_name} & {order.partner2_name}
                          </td>
                          <td className="px-4 py-5">
                            <span className="rounded-full bg-[#F0FDF4] px-3 py-1 text-xs font-semibold text-[#166534]">
                              {order.plan_type === "ESSENTIEL"
                                ? "Essentiel"
                                : "Premium"}
                            </span>
                          </td>
                          <td className="px-4 py-5 font-semibold">
                            {order.amount.toLocaleString("fr-FR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                            €
                          </td>
                          <td className="px-4 py-5 text-right">
                            <span
                              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(order.status)}`}
                            >
                              {statusLabel(order.status)}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
