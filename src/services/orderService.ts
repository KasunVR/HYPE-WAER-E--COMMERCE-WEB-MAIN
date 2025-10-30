export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color?: string;
  image?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  paymentSlip: string;
  shippingAddress: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

const ORDERS_STORAGE_KEY = 'hype_wear_orders';

export const getAllOrders = (): Order[] => {
  try {
    const ordersData = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!ordersData) {
      return [];
    }
    const orders = JSON.parse(ordersData);
    return Array.isArray(orders) ? orders : [];
  } catch (error) {
    console.error('Error reading orders from localStorage:', error);
    return [];
  }
};

export const addOrder = (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
  try {
    const orders = getAllOrders();
    const orderNumber = `ORD-${Date.now()}`;
    const newOrder: Order = {
      ...order,
      id: `order_${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
    };
    
    orders.push(newOrder);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    console.log('Order saved successfully:', newOrder);
    return newOrder;
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
};

export const updateOrderStatus = (orderId: string, status: Order['status']): void => {
  const orders = getAllOrders();
  const orderIndex = orders.findIndex(o => o.id === orderId);
  
  if (orderIndex !== -1) {
    orders[orderIndex].status = status;
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }
};

export const deleteOrder = (orderId: string): void => {
  const orders = getAllOrders();
  const filteredOrders = orders.filter(o => o.id !== orderId);
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(filteredOrders));
};

export const generateOrderPDF = (order: Order): void => {
  // Create a styled HTML document
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Order ${order.orderNumber}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
      background: white;
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #000;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .header h1 {
      margin: 0;
      font-size: 32px;
      color: #000;
    }
    .section {
      margin-bottom: 25px;
    }
    .section-title {
      font-size: 18px;
      font-weight: bold;
      border-bottom: 2px solid #ddd;
      padding-bottom: 10px;
      margin-bottom: 15px;
    }
    .info-row {
      margin: 8px 0;
      font-size: 14px;
    }
    .info-label {
      font-weight: bold;
      width: 150px;
      display: inline-block;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }
    th {
      background-color: #000;
      color: white;
      padding: 12px;
      text-align: left;
    }
    td {
      padding: 12px;
      border-bottom: 1px solid #ddd;
    }
    .summary {
      margin-top: 30px;
      text-align: right;
    }
    .summary-row {
      margin: 10px 0;
      font-size: 14px;
    }
    .total {
      border-top: 2px solid #000;
      padding-top: 10px;
      font-size: 18px;
      font-weight: bold;
      margin-top: 15px;
    }
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 2px solid #ddd;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>HYPE WEAR</h1>
    <p>ORDER RECEIPT</p>
    <p>Order Number: <strong>${order.orderNumber}</strong></p>
    <p>Date: ${new Date(order.createdAt).toLocaleString()}</p>
  </div>

  <div class="section">
    <div class="section-title">Customer Information</div>
    <div class="info-row"><span class="info-label">Name:</span> ${order.customerName}</div>
    <div class="info-row"><span class="info-label">Phone:</span> ${order.customerPhone}</div>
    <div class="info-row"><span class="info-label">Email:</span> ${order.customerEmail}</div>
    <div class="info-row"><span class="info-label">Payment Slip:</span> ${order.paymentSlip}</div>
    <div class="info-row"><span class="info-label">Shipping Address:</span> ${order.shippingAddress.replace(/\n/g, '<br>')}</div>
  </div>

  <div class="section">
    <div class="section-title">Order Items</div>
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Color</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${order.items.map(item => `
        <tr>
          <td>${item.name}</td>
          <td>${item.color || '-'}</td>
          <td>${item.quantity}</td>
          <td>RS ${item.price.toFixed(2)}</td>
          <td>RS ${(item.quantity * item.price).toFixed(2)}</td>
        </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <div class="summary">
    <div class="summary-row">Subtotal: RS ${order.subtotal.toFixed(2)}</div>
    <div class="summary-row">Tax (10%): RS ${order.tax.toFixed(2)}</div>
    <div class="summary-row total">TOTAL: RS ${order.total.toFixed(2)}</div>
  </div>

  <div class="footer">
    <p>Thank you for shopping with HYPE WEAR!</p>
  </div>
</body>
</html>
  `;

  // Create a blob and download as HTML file
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${order.orderNumber}-Receipt.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
