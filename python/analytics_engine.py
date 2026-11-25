"""
OmniAnalytics - Retail Data & Forecasting Engine
Implements trend analysis, moving average forecasting, and retail KPI computation.
Uses standard Python libraries with optional Pandas & NumPy acceleration.
"""

import sys
import json
from datetime import datetime

# Sample historical daily sales data matching UI.webp
SALES_HISTORY = [
    {"date": "2026-08-12", "sold": 88, "returns": 14, "revenue": 1850.0},
    {"date": "2026-08-13", "sold": 95, "returns": 10, "revenue": 1920.0},
    {"date": "2026-08-14", "sold": 104, "returns": 12, "revenue": 2340.0},
    {"date": "2026-08-15", "sold": 78, "returns": 12, "revenue": 1640.0},
    {"date": "2026-08-16", "sold": 50, "returns": 8, "revenue": 980.0},
    {"date": "2026-08-17", "sold": 82, "returns": 11, "revenue": 1750.0},
    {"date": "2026-08-18", "sold": 92, "returns": 15, "revenue": 1990.0},
    {"date": "2026-08-19", "sold": 58, "returns": 9, "revenue": 1200.0},
    {"date": "2026-08-20", "sold": 48, "returns": 6, "revenue": 950.0},
    {"date": "2026-08-21", "sold": 75, "returns": 13, "revenue": 1610.0},
    {"date": "2026-08-22", "sold": 85, "returns": 11, "revenue": 1820.0},
    {"date": "2026-08-23", "sold": 68, "returns": 9, "revenue": 1450.0},
    {"date": "2026-08-24", "sold": 72, "returns": 14, "revenue": 1580.0},
    {"date": "2026-08-25", "sold": 80, "returns": 10, "revenue": 1720.0},
    {"date": "2026-08-26", "sold": 52, "returns": 7, "revenue": 1050.0},
    {"date": "2026-08-27", "sold": 62, "returns": 15, "revenue": 1340.0},
]

def compute_kpis(data):
    total_sold = sum(d["sold"] for d in data)
    total_returns = sum(d["returns"] for d in data)
    total_revenue = sum(d["revenue"] for d in data)
    return_rate = (total_returns / total_sold * 100) if total_sold else 0
    avg_daily_revenue = total_revenue / len(data) if data else 0

    return {
        "total_units_sold": total_sold,
        "total_returns": total_returns,
        "total_revenue": round(total_revenue, 2),
        "return_rate_pct": round(return_rate, 2),
        "average_daily_revenue": round(avg_daily_revenue, 2),
    }

def moving_average_forecast(data, window=5, steps=5):
    """Computes moving average and forecasts next intervals."""
    revenues = [d["revenue"] for d in data]
    if len(revenues) < window:
        window = len(revenues)

    forecasts = []
    current_stream = list(revenues)

    for i in range(steps):
        ma = sum(current_stream[-window:]) / window
        # Apply a modest growth factor (e.g. 2.5% seasonal uplift)
        predicted = round(ma * 1.025, 2)
        current_stream.append(predicted)
        forecasts.append(predicted)

    return forecasts

def main():
    print("=" * 60)
    print("  OmniAnalytics Python Data & Predictive Analytics Engine")
    print("=" * 60)

    kpis = compute_kpis(SALES_HISTORY)
    print(f"\n[+] Total Units Sold:     {kpis['total_units_sold']}")
    print(f"[+] Total Units Returned: {kpis['total_returns']}")
    print(f"[+] Return Rate:          {kpis['return_rate_pct']}%")
    print(f"[+] Period Revenue:       ${kpis['total_revenue']:,.2f}")
    print(f"[+] Average Daily Rev:    ${kpis['average_daily_revenue']:,.2f}")

    forecasts = moving_average_forecast(SALES_HISTORY, window=5, steps=4)
    print("\n[+] 4-Period Revenue Forecast (Moving Avg + Seasonal Factor):")
    for idx, f in enumerate(forecasts, 1):
        print(f"    Period +{idx}: ${f:,.2f}")

    output_summary = {
        "timestamp": datetime.now().isoformat(),
        "kpis": kpis,
        "forecasts": forecasts
    }

    with open("analytics_output.json", "w") as f:
        json.dump(output_summary, f, indent=2)

    print("\n[OK] Results exported to python/analytics_output.json")
    print("=" * 60)

if __name__ == "__main__":
    main()
