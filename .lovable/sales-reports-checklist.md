# 📊 Sales Reports — Availability Checklist

---

## ⏱️ Time-Based Reports

**✅ Available**
- Daily Sales — `/cash-flow`, `DailySalesReport.tsx`, `/reports` (today)
- Hourly Sales — `/reports/more?r=hourly`, `get_hourly_sales`
- Weekly Sales — `/reports` (week range)
- Monthly Sales — `/reports` (month range)
- Sales Trend — `/advanced-reports → salesTrend`, `get_sales_trends`
- Revenue Trend — covered by Sales Trend + `/executive-dashboard`
- Peak Hours Analysis — Hourly Sales report highlights peaks

**🟡 Partial / Derivable**
- Yearly Sales — supported via custom date range, no dedicated card

**❌ Not Available**
- Sales Comparison (period vs period)
- Sales Forecast — Revenue Forecast exists (`/revenue-forecast`), but no item/sales-level forecast

---

## 💰 Revenue & Financial Reports

**✅ Available**
- Sales Summary — `/reports/sales`
- Revenue Report — `/reports`, `/executive-dashboard`
- Revenue Analysis — `/advanced-reports`, `/admin/finance`
- Tax Summary — `/reports/more?r=tax`, `get_tax_report`
- Discount Summary — `/reports/more?r=discount`, `get_discount_report`
- Average Bill Value (AOV) — KPI on `/reports` + Multi-Outlet report
- Profit Margin Report — `/advanced-reports → pl`, `get_pl_report`

**🟡 Partial / Derivable**
- Gross Sales — shown as KPI on `/reports`, no dedicated card
- Net Sales — shown as KPI on `/reports`, no dedicated card
- Gross Margin Analysis — inside P&L category breakdown

**❌ Not Available**
- (none)

---

## 📦 Product & Category Reports

**✅ Available**
- Product-wise Sales — `/reports/item`, `/reports/more?r=item`
- Item-wise Sales — same as above
- Category-wise Sales — `/reports/category`
- Product Performance Report — `AdvancedReportTabs → ItemPerformanceReport`

**🟡 Partial / Derivable**
- (none)

**❌ Not Available**
- Brand-wise Sales — no `brand` field on products

---

## 👥 Customer Reports

**✅ Available**
- Customer-wise Sales — `/reports/more?r=customer`
- Customer Purchase Analysis — `get_customer_analytics`, Customer Retention report

**🟡 Partial / Derivable**
- Customer Order History — visible inside `/customers` detail; no standalone report

**❌ Not Available**
- (none)

---

## 🏪 Outlet & Location Reports

**✅ Available**
- Outlet-wise Sales — `AdvancedReportTabs → MultiOutletReport`, `get_multi_outlet_report`
- Branch-wise Sales — same (branches = outlets in this system)
- Counter-wise Sales — `/reports/counter`

**🟡 Partial / Derivable**
- (none)

**❌ Not Available**
- Region-wise Sales — no region grouping on stores

---

## 👤 Employee Reports

**✅ Available**
- Salesperson Performance — `/reports/employee`, `AdvancedReportTabs → StaffPerformance`
- Salesperson-wise Sales — `/reports/more?r=staff`

**🟡 Partial / Derivable**
- (none)

**❌ Not Available**
- (none)

---

## 🧾 Order & Billing Reports

**✅ Available**
- Bill-wise Sales — `/search-bill`, `/reports/order`
- Order Statistics — `/reports/order`, `get_order_behavior`
- Sales Order Report — `/reports/order`

**🟡 Partial / Derivable**
- (none)

**❌ Not Available**
- Sales Return Report — no return/refund flow yet
- Back Order Report — no back-order module
- Quotation Report — no quotation module

---

## 📈 Business Performance Reports

**✅ Available**
- Sales Analysis Report — `/advanced-reports` (multiple analysis tabs)
- Forecast Report — `/revenue-forecast`

**🟡 Partial / Derivable**
- (none)

**❌ Not Available**
- Sales Pipeline Report — no CRM pipeline module

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
