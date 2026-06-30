# 📊 Sales Reports — Availability Checklist

Legend: ✅ Available  •  ❌ Not Available  •  🟡 Partial / Derivable

---

## ⏱️ Time-Based Reports

- ✅ Daily Sales — `/cash-flow`, `DailySalesReport.tsx`, `/reports` (today)
- ✅ Hourly Sales — `/reports/more?r=hourly`, `get_hourly_sales`
- ✅ Weekly Sales — `/reports` (week range)
- ✅ Monthly Sales — `/reports` (month range)
- 🟡 Yearly Sales — supported via custom date range, no dedicated card
- ✅ Sales Trend — `/advanced-reports → salesTrend`, `get_sales_trends`
- ❌ Sales Comparison (period vs period) — not built
- ❌ Sales Forecast — Revenue Forecast exists (`/revenue-forecast`), but no item/sales-level forecast
- ✅ Revenue Trend — covered by Sales Trend + `/executive-dashboard`
- ✅ Peak Hours Analysis — Hourly Sales report highlights peaks

---

## 💰 Revenue & Financial Reports

- ✅ Sales Summary — `/reports/sales`
- 🟡 Gross Sales — shown as KPI on `/reports`, no dedicated card
- 🟡 Net Sales — shown as KPI on `/reports`, no dedicated card
- ✅ Revenue Report — `/reports`, `/executive-dashboard`
- ✅ Revenue Analysis — `/advanced-reports`, `/admin/finance`
- ✅ Tax Summary — `/reports/more?r=tax`, `get_tax_report`
- ✅ Discount Summary — `/reports/more?r=discount`, `get_discount_report`
- ✅ Average Bill Value (AOV) — KPI on `/reports` + Multi-Outlet report
- 🟡 Gross Margin Analysis — inside P&L category breakdown
- ✅ Profit Margin Report — `/advanced-reports → pl`, `get_pl_report`

---

## 📦 Product & Category Reports

- ✅ Product-wise Sales — `/reports/item`, `/reports/more?r=item`
- ✅ Item-wise Sales — same as above
- ✅ Category-wise Sales — `/reports/category`
- ❌ Brand-wise Sales — no `brand` field on products
- ✅ Product Performance Report — `AdvancedReportTabs → ItemPerformanceReport`

---

## 👥 Customer Reports

- ✅ Customer-wise Sales — `/reports/more?r=customer`
- 🟡 Customer Order History — visible inside `/customers` detail; no standalone report
- ✅ Customer Purchase Analysis — `get_customer_analytics`, Customer Retention report

---

## 🏪 Outlet & Location Reports

- ✅ Outlet-wise Sales — `AdvancedReportTabs → MultiOutletReport`, `get_multi_outlet_report`
- ✅ Branch-wise Sales — same (branches = outlets in this system)
- ❌ Region-wise Sales — no region grouping on stores
- ✅ Counter-wise Sales — `/reports/counter`

---

## 👤 Employee Reports

- ✅ Salesperson Performance — `/reports/employee`, `AdvancedReportTabs → StaffPerformance`
- ✅ Salesperson-wise Sales — `/reports/more?r=staff`

---

## 🧾 Order & Billing Reports

- ✅ Bill-wise Sales — `/search-bill`, `/reports/order`
- ✅ Order Statistics — `/reports/order`, `get_order_behavior`
- ✅ Sales Order Report — `/reports/order`
- ❌ Sales Return Report — no return/refund flow yet
- ❌ Back Order Report — no back-order module
- ❌ Quotation Report — no quotation module

---

## 📈 Business Performance Reports

- ❌ Sales Pipeline Report — no CRM pipeline module
- ✅ Sales Analysis Report — `/advanced-reports` (multiple analysis tabs)
- ✅ Forecast Report — `/revenue-forecast`

---

## 📌 Summary

| Status | Count |
|---|---|
| ✅ Available | 27 |
| 🟡 Partial | 6 |
| ❌ Missing | 7 |

### ❌ Missing (high-value, recommended to build)
1. **Sales Comparison** (today vs yesterday, MoM, YoY) — derivable from existing orders
2. **Sales Return Report** — needs refund/return flow first
3. **Brand-wise Sales** — needs `brand` field on products
4. **Region-wise Sales** — needs `region` field on stores
5. **Quotation Report** — needs quotation module
6. **Back Order Report** — needs back-order module
7. **Sales Pipeline Report** — needs CRM pipeline module
