"use client";
import React from "react";
import { useCart } from "@/context/CartContext";
import { X, Trash, CheckCircle } from "lucide-react";

const CustomAlert: React.FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-sm w-full mx-4 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-6 w-6 text-orange-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-md text-slate-700 dark:text-slate-300">
              {message}
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-orange-600 text-white text-sm cursor-pointer hover:bg-orange-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const CartPanel: React.FC = () => {
  const { items, open, closeCart, removeItem, updateQty, clear } = useCart();
  const [alertMessage, setAlertMessage] = React.useState<string | null>(null);

  return (
    <>
      <aside
        aria-hidden={!open}
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white dark:bg-slate-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="p-2 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-160px)]">
          {items.length === 0 ? (
            <p className="text-sm text-slate-500">Your cart is empty.</p>
          ) : (
            items.map((it) => (
              <div
                key={it.id + (it.size ?? "")}
                className="flex items-center gap-3 py-3 border-b border-slate-100 dark:border-slate-800"
              >
                <img
                  src={it.source}
                  className="w-16 h-16 rounded-md object-cover"
                  alt=""
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Shoe</p>
                      {it.size && (
                        <p className="text-xs text-slate-500">Size {it.size}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        console.log("removeItem", it.id);
                        removeItem(it.id);
                      }}
                      className="p-2 text-red-500 cursor-pointer"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        console.log("panel dec", it.id);
                        updateQty(it.id, Math.max(0, it.qty - 1));
                      }}
                      className="px-2 py-1 rounded-md border cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-2">{it.qty}</span>
                    <button
                      type="button"
                      onClick={() => {
                        console.log("panel inc", it.id);
                        updateQty(it.id, it.qty + 1);
                      }}
                      className="px-2 py-1 rounded-md border cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-4 py-0.2 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-600">Total items</span>
            <span className="font-medium">
              {items.reduce((s, i) => s + i.qty, 0)}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              className="flex-1 px-4 py-2 rounded-md border cursor-pointer"
              onClick={clear}
            >
              Clear
            </button>
            <PlaceOrderButton
              items={items}
              onSuccess={() => clear()}
              onAlert={setAlertMessage}
            />
          </div>
        </div>
      </aside>

      {alertMessage && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setAlertMessage(null)}
        />
      )}
    </>
  );
};

const PlaceOrderButton: React.FC<{
  items: any[];
  onSuccess?: () => void;
  onAlert: (message: string) => void;
}> = ({ items, onSuccess, onAlert }) => {
  const [loading, setLoading] = React.useState(false);

  const place = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      // Get the base URL (works for both client and server)
      const baseUrl =
        typeof window !== "undefined"
          ? window.location.origin
          : "https://ex2325.vercel.app";

      // Map items to include full image URL
      const itemsWithImages = items.map((item) => {
        let imageUrl = item.source;

        // If the image is a relative path, convert to absolute URL
        if (imageUrl && !imageUrl.startsWith("http")) {
          imageUrl = `${baseUrl}${
            imageUrl.startsWith("/") ? "" : "/"
          }${imageUrl}`;
        }

        return {
          id: item.id,
          size: item.size,
          qty: item.qty,
          image: imageUrl,
        };
      });

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: itemsWithImages }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        onAlert("Order placed. We'll email you a confirmation");
        onSuccess && onSuccess();
      } else {
        console.error(data);
        onAlert(data.error || data.warning || "Failed to place order");
      }
    } catch (err) {
      console.error(err);
      onAlert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={place}
      disabled={loading}
      className="flex-1 px-4 py-2 rounded-md bg-orange-600 text-white cursor-pointer"
    >
      {loading ? "Placing..." : "Place order"}
    </button>
  );
};

export default CartPanel;
