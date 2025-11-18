import { Link2, MousePointerClick, PlusCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUrls, deleteUrl } from "../store/slices/urlSlice";
import CreateLinkModal from "./CreateLinkModal";
import EditLinkModal from "./EditLinkModal";
import AnalyticsModal from "./AnalyticsModal";
import LinkCard from "./LinkCard";
import { Spinner } from "./ui";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { urls, isLoading } = useSelector((state) => state.url);

  const [animate, setAnimate] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    dispatch(fetchUrls({ search: searchTerm }));
  }, [dispatch, searchTerm]);

  const handleEdit = (link) => {
    setSelectedLink(link);
    setShowEditModal(true);
  };

  const handleDelete = async (link) => {
    if (window.confirm(`Are you sure you want to delete /${link.slug}?`)) {
      await dispatch(deleteUrl(link._id));
    }
  };

  const handleViewAnalytics = (link) => {
    setSelectedLink(link);
    setShowAnalyticsModal(true);
  };

  const totalClicks = (urls || []).reduce(
    (sum, link) => sum + (link.clicks || 0),
    0
  );
  const linkCount = urls?.length || 0;

  return (
    <>
      <div className="min-h-screen bg-neutral-900 text-white p-8 pt-24 font-[Inter]">
        {/* Page Heading */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-[Open Sans] font-semibold tracking-tight">
            Dashboard
          </h1>

          {/* Search Bar */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search links..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full py-2 pl-10 pr-4 rounded-xl
                bg-white/5 border border-stone-800
                text-white placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-purple-600/40
                transition-all duration-200
              "
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Links */}
          <div
            className={`
              rounded-2xl bg-white/5 backdrop-blur-xl border border-stone-800 
              shadow-md p-6 flex flex-col
              transition-all duration-200 ease-in
              ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}
            `}
          >
            <div className="flex items-center justify-between mb-4">
              <Link2 className="w-5 h-5 text-purple-400" />
              <span className="text-xs text-gray-400">Total</span>
            </div>
            <p className="text-3xl font-semibold tracking-tight">{linkCount}</p>
            <p className="text-sm text-gray-400 mt-1">Active Links</p>
          </div>

          {/* Total Clicks */}
          <div
            className={`
              rounded-2xl bg-white/5 backdrop-blur-xl border border-stone-800 
              shadow-md p-6 flex flex-col
              transition-all duration-200 ease-in delay-75
              ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}
            `}
          >
            <div className="flex items-center justify-between mb-4">
              <MousePointerClick className="w-5 h-5 text-emerald-400" />
              <span className="text-xs text-gray-400">Engagement</span>
            </div>
            <p className="text-3xl font-semibold tracking-tight">
              {totalClicks.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400 mt-1">Total Clicks</p>
          </div>

          {/* Create New Link Card */}
          <div
            className={`
              md:col-span-2 rounded-2xl bg-linear-to-br from-purple-600/20 to-purple-400/10 
              backdrop-blur-xl border border-purple-500/30
              shadow-md p-6 flex items-center justify-between
              transition-all duration-200 ease-in delay-150
              hover:scale-[1.01] cursor-pointer
              ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}
            `}
            onClick={() => setShowCreateModal(true)}
          >
            <div>
              <h3 className="text-lg font-semibold font-[Open Sans] tracking-tight mb-1">
                Create New Link
              </h3>
              <p className="text-sm text-gray-300">
                Shorten a URL and start tracking clicks
              </p>
            </div>
            <div
              className="
              p-3 rounded-xl bg-purple-600 hover:bg-purple-500 
              transition-all duration-200
            "
            >
              <PlusCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Links List */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-stone-800 shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-[Open Sans] font-semibold tracking-tight">
              Your Links
            </h2>
            <span className="text-sm text-gray-400">
              {linkCount} {linkCount === 1 ? "link" : "links"}
            </span>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Spinner />
            </div>
          ) : linkCount === 0 ? (
            <div className="text-center py-12">
              <Link2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">No links yet</p>
              <p className="text-sm text-gray-500 mb-6">
                {searchTerm
                  ? "No links match your search"
                  : "Create your first short link to get started"}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="
                    py-2 px-6 rounded-xl
                    bg-purple-600 hover:bg-purple-500
                    transition-all duration-200
                  "
                >
                  Create Link
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
              {(urls || []).map((link) => (
                <LinkCard
                  key={link._id}
                  link={link}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onViewAnalytics={handleViewAnalytics}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateLinkModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      <EditLinkModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedLink(null);
        }}
        link={selectedLink}
      />

      <AnalyticsModal
        isOpen={showAnalyticsModal}
        onClose={() => {
          setShowAnalyticsModal(false);
          setSelectedLink(null);
        }}
        link={selectedLink}
      />
    </>
  );
}
