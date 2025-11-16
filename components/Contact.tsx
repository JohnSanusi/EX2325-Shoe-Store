"use client";
import { useState } from "react";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        console.error("Contact API error", data);
        setStatus("idle");
        alert(data.error || data.warning || "Failed to send message");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
      setStatus("idle");
    } finally {
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  return (
    <section id="contact" className="px-6 md:px-8 py-12 mt-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3">
            Get in touch
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Have a question about sizing, orders or returns? Send us a message
            and we'll get back to you shortly.
          </p>

          <div className="rounded-md overflow-hidden border border-slate-200 dark:border-slate-800">
            <iframe
              title="Store location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.5040576780966!2d3.2417311888549776!3d6.457636600000009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b866caf1ccdcb%3A0xf26aea9ac338c46e!2sTradefairlagos!5e0!3m2!1sen!2sng!4v1763336513813!5m2!1sen!2sng"
              className="w-full h-64 md:h-72 border-0"
              loading="lazy"
            />
          </div>

          <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            <p className="mb-1">
              <strong>Address:</strong> Trade Fair Lagos
            </p>
            <a href="tel:+234 906 908 8121" className="mb-1">
              <strong>Phone:</strong> +234 906 908 8121
            </a>

            <p>
              <strong>Hours:</strong> Mon–Fri 9am–6pm
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-6 shadow-sm"
        >
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-3 rounded-md border px-3 py-2 border-slate-200 dark:border-slate-700 bg-transparent"
          />

          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 rounded-md border px-3 py-2 border-slate-200 dark:border-slate-700 bg-transparent"
          />

          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full mb-3 rounded-md border px-3 py-2 h-28 border-slate-200 dark:border-slate-700 bg-transparent resize-none"
          />

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center bg-orange-600 text-white px-4 py-2 rounded-md font-semibold hover:brightness-95 transition cursor-pointer"
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </button>
            {status === "sent" && (
              <span className="text-sm text-green-600">Message sent</span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
