import React, { useState, useRef, useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  Bot,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Package,
  Trash2,
  ArrowRight,
  TrendingUp,
  Tag
} from 'lucide-react';

export default function AIAssistantWidget({ onNavigateTab }) {
  const { products, getProductStatus, lowStockCount, outOfStockCount, totalValuation, totalRevenue } = useInventory();
  const { user, isAdmin } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const initialGreeting = {
    id: 1,
    sender: 'bot',
    text: `Hello ${user?.name || 'there'}! 👋 I am **OmniAssistant**, your AI Store & Inventory Guide. You can ask me to find products, locate shelf aisles, check live stock levels, or recommend items by price.`,
    products: []
  };

  const [messages, setMessages] = useState([initialGreeting]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isTyping]);

  const quickPrompts = [
    '🎧 Find wireless headphones',
    '⚠️ Which items need reorder?',
    '💰 Products under ₹2,000',
    '📍 Where is the Air Fryer?',
    '🏃 Show sports & fitness gear',
  ];

  // Natural Language Intent Processor & Store Intelligence
  const processQuery = (queryText) => {
    const q = queryText.toLowerCase().trim();

    // 1. Check for Low Stock / Reorder Queries
    if (q.includes('reorder') || q.includes('low stock') || q.includes('running out') || q.includes('out of stock')) {
      const urgentItems = products.filter(p => {
        const status = getProductStatus(p);
        return status === 'Low Stock' || status === 'Out of Stock';
      });

      if (urgentItems.length === 0) {
        return {
          text: `Great news! All products are currently in healthy stock levels. There are zero urgent reorders needed right now.`,
          products: []
        };
      }

      return {
        text: `Found **${urgentItems.length} items** requiring immediate warehouse replenishment (${lowStockCount} Low Stock, ${outOfStockCount} Out of Stock):`,
        products: urgentItems.slice(0, 4)
      };
    }

    // 2. Check for Store Shelf / Location Queries (e.g. "where is...", "location of...")
    if (q.includes('where is') || q.includes('location') || q.includes('aisle') || q.includes('shelf') || q.includes('find the')) {
      const matched = products.filter(p =>
        q.includes(p.name.toLowerCase()) ||
        p.name.toLowerCase().split(' ').some(word => word.length > 3 && q.includes(word)) ||
        q.includes(p.sku.toLowerCase())
      );

      if (matched.length > 0) {
        const item = matched[0];
        return {
          text: `**${item.name}** is located on the store floor at **${item.location || 'Aisle 1 - Bay A'}**. Currently **${item.stock} units** available at **₹${item.price.toLocaleString('en-IN')}**.`,
          products: [item]
        };
      }
    }

    // 3. Check for Budget / Price Queries (e.g. "under 2000", "below 1500", "less than 3000")
    const priceMatch = q.match(/(?:under|below|less than|<|within)\s*(?:rs\.?|inr|₹)?\s*(\d+)/i);
    if (priceMatch) {
      const maxPrice = parseInt(priceMatch[1], 10);
      const budgetItems = products
        .filter(p => p.price <= maxPrice)
        .sort((a, b) => b.solds - a.solds);

      if (budgetItems.length === 0) {
        return {
          text: `I couldn't find any items priced under **₹${maxPrice.toLocaleString('en-IN')}**. Our most affordable item is **${products[0]?.name}** at ₹${products[0]?.price.toLocaleString('en-IN')}.`,
          products: []
        };
      }

      return {
        text: `Here are **${budgetItems.length} top-selling items** priced under **₹${maxPrice.toLocaleString('en-IN')}**:`,
        products: budgetItems.slice(0, 4)
      };
    }

    // 4. Check for Category Queries
    const categoryMap = {
      'electronic': 'Electronics & Accessories',
      'headphone': 'Electronics & Accessories',
      'earbud': 'Electronics & Accessories',
      'charger': 'Electronics & Accessories',
      'keyboard': 'Electronics & Accessories',
      'apparel': 'Apparel & Footwear',
      'clothing': 'Apparel & Footwear',
      'hoodie': 'Apparel & Footwear',
      'sneaker': 'Apparel & Footwear',
      'shoe': 'Apparel & Footwear',
      'jacket': 'Apparel & Footwear',
      'kitchen': 'Home & Kitchen',
      'tumbler': 'Home & Kitchen',
      'air fryer': 'Home & Kitchen',
      'lamp': 'Home & Kitchen',
      'mug': 'Home & Kitchen',
      'beauty': 'Beauty & Personal Care',
      'serum': 'Beauty & Personal Care',
      'cleanser': 'Beauty & Personal Care',
      'lotion': 'Beauty & Personal Care',
      'sport': 'Sports & Fitness',
      'fitness': 'Sports & Fitness',
      'yoga': 'Sports & Fitness',
      'bottle': 'Sports & Fitness',
      'gym': 'Sports & Fitness'
    };

    for (const [key, categoryName] of Object.entries(categoryMap)) {
      if (q.includes(key)) {
        const catItems = products.filter(p => p.category === categoryName);
        return {
          text: `Found **${catItems.length} products** in the **${categoryName}** collection:`,
          products: catItems.slice(0, 4)
        };
      }
    }

    // 5. General Keyword Search across product names and SKUs
    const directMatches = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q))
    );

    if (directMatches.length > 0) {
      return {
        text: `I found **${directMatches.length} matching product${directMatches.length > 1 ? 's' : ''}** for "${queryText}":`,
        products: directMatches.slice(0, 4)
      };
    }

    // 6. Business Overview & Metrics queries
    if (q.includes('revenue') || q.includes('sales') || q.includes('valuation') || q.includes('total items')) {
      return {
        text: `Here is a quick snapshot of the store metrics:\n• **Catalog Size:** ${products.length} Active SKUs\n• **Inventory Valuation:** ₹${totalValuation.toLocaleString('en-IN')}\n• **Total Historical Revenue:** ₹${totalRevenue.toLocaleString('en-IN')}\n• **Low Stock Warnings:** ${lowStockCount} items need restock.`,
        products: []
      };
    }

    // 7. Fallback helpful response
    return {
      text: `I'm not completely sure about "${queryText}". Try asking for a product name (e.g. *Yoga Mat*, *Earbuds*), a category (*Electronics*, *Apparel*), or a budget filter (*"items under ₹2000"*).`,
      products: products.slice(0, 2)
    };
  };

  const handleSend = (textToSend) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: messageText,
      products: []
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Realistic bot response delay
    setTimeout(() => {
      const response = processQuery(messageText);
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.text,
        products: response.products || []
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 400);
  };

  const handleQuickPrompt = (prompt) => {
    // Strip leading emoji for processing
    const cleanPrompt = prompt.replace(/^[^\w\s]+\s*/, '');
    handleSend(cleanPrompt);
  };

  const clearChat = () => {
    setMessages([initialGreeting]);
  };

  return (
    <>
      {/* Floating Action Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer group"
          title="Open AI Store Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-purple-600 animate-pulse" />
          </div>
          <span className="tracking-wide">Ask OmniAssistant AI</span>
        </button>
      )}

      {/* Interactive AI Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-5 right-4 sm:right-6 z-50 w-[92vw] sm:w-[410px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-fade-in font-sans">
          {/* Header */}
          <div className="p-4 bg-linear-to-r from-purple-700 to-indigo-800 text-white flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                <Sparkles className="w-4 h-4 text-purple-200" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm tracking-tight">OmniAssistant</h3>
                  <span className="text-[9px] bg-emerald-400/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded-full border border-emerald-400/30">
                    Active
                  </span>
                </div>
                <p className="text-[11px] text-purple-200 font-medium">Store & Stock Intelligence AI</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="p-1.5 rounded-xl hover:bg-white/15 text-purple-200 hover:text-white transition cursor-pointer"
                title="Reset conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/15 text-purple-200 hover:text-white transition cursor-pointer"
                title="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-purple-50/70 border-b border-purple-100/60 overflow-x-auto flex items-center gap-1.5 shrink-0 no-scrollbar">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPrompt(p)}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-purple-100/80 text-purple-900 text-[11px] font-semibold border border-purple-200/60 whitespace-nowrap transition cursor-pointer shadow-2xs shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-[#fbfbfe]">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  {/* Text Bubble */}
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                      isUser
                        ? 'bg-[#18181b] text-white rounded-br-xs shadow-sm font-medium'
                        : 'bg-white text-gray-800 rounded-bl-xs border border-gray-100 shadow-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>

                  {/* Product Recommendation Cards (if returned by AI) */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="w-full mt-2.5 space-y-2">
                      {msg.products.map((item) => {
                        const status = getProductStatus(item);
                        const isOutOfStock = status === 'Out of Stock';
                        const isLowStock = status === 'Low Stock';

                        return (
                          <div
                            key={item.id}
                            className="bg-white rounded-2xl p-2.5 border border-purple-100 hover:border-purple-300 shadow-xs flex items-center justify-between gap-3 transition group"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-xl object-cover shrink-0 bg-gray-50 border border-gray-100"
                            />

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-mono font-bold bg-gray-100 text-gray-700 px-1 py-0.2 rounded">
                                  {item.sku}
                                </span>
                                <span
                                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                                    isOutOfStock
                                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                      : isLowStock
                                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  }`}
                                >
                                  {status} ({item.stock})
                                </span>
                              </div>

                              <h4 className="text-xs font-bold text-gray-900 truncate mt-0.5">
                                {item.name}
                              </h4>

                              <div className="flex items-center justify-between text-[11px] mt-1">
                                <span className="font-extrabold text-purple-700">
                                  ₹{item.price.toLocaleString('en-IN')}
                                </span>
                                <span className="text-gray-400 font-medium flex items-center gap-0.5 text-[10px]">
                                  <MapPin className="w-3 h-3 text-purple-500" />
                                  {item.location || 'Aisle 1'}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                onNavigateTab(isAdmin ? 'products' : 'stock-check');
                                setIsOpen(false);
                              }}
                              className="p-1.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white transition cursor-pointer shrink-0"
                              title="Inspect on store floor"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white border border-gray-100 w-16 p-2 rounded-2xl rounded-bl-xs shadow-2xs">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about products, aisles, stock..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-gray-50 hover:bg-gray-100/70 focus:bg-white rounded-full text-xs font-medium border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition shadow-sm ${
                input.trim()
                  ? 'bg-purple-600 hover:bg-purple-700 text-white cursor-pointer'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
