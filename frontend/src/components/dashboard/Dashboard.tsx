import  { useState } from 'react';

const Dashboard = () => {
  // Sample data for dashboard
  const [salesData] = useState([
    { month: 'Jan', revenue: 45000, orders: 1200 },
    { month: 'Feb', revenue: 52000, orders: 1350 },
    { month: 'Mar', revenue: 49000, orders: 1280 },
    { month: 'Apr', revenue: 58000, orders: 1420 },
    { month: 'May', revenue: 63000, orders: 1550 },
    { month: 'Jun', revenue: 59000, orders: 1480 },
  ]);

  const [recentOrders] = useState([
    { id: '1234', customer: 'John Doe', total: 129.99, status: 'Delivered', date: '2025-03-17' },
    { id: '1235', customer: 'Jane Smith', total: 89.95, status: 'Processing', date: '2025-03-18' },
    { id: '1236', customer: 'Robert Johnson', total: 214.50, status: 'Shipped', date: '2025-03-18' },
    { id: '1237', customer: 'Lisa Brown', total: 45.00, status: 'Pending', date: '2025-03-18' },
    { id: '1238', customer: 'Michael Davis', total: 175.25, status: 'Processing', date: '2025-03-18' },
  ]);

  const [inventoryAlerts] = useState([
    { product: 'Wireless Earbuds', sku: 'WE-001', stock: 3, threshold: 5 },
    { product: 'Smart Watch', sku: 'SW-102', stock: 2, threshold: 10 },
    { product: 'Laptop Sleeve', sku: 'LS-210', stock: 4, threshold: 5 },
  ]);

  // Stats for summary cards
  const stats = {
    totalRevenue: '$326,000',
    dailyOrders: 87,
    conversionRate: '3.2%',
    averageOrderValue: '$78.50'
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">E-Commerce Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-gray-200 p-2 rounded-full">
              <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex items-center">
              <img className="h-8 w-8 rounded-full" src="/api/placeholder/32/32" alt="Admin" />
              <span className="ml-2 text-gray-700">Admin User</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue}</p>
            <div className="flex items-center text-green-500 text-sm mt-2">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              <span>12% from last month</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-gray-500 text-sm font-medium">Daily Orders</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.dailyOrders}</p>
            <div className="flex items-center text-green-500 text-sm mt-2">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              <span>8% from yesterday</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-gray-500 text-sm font-medium">Conversion Rate</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}</p>
            <div className="flex items-center text-red-500 text-sm mt-2">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
              </svg>
              <span>0.5% from last week</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-gray-500 text-sm font-medium">Average Order Value</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.averageOrderValue}</p>
            <div className="flex items-center text-green-500 text-sm mt-2">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              <span>3% from last month</span>
            </div>
          </div>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sales Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Revenue & Orders</h2>
            <div className="h-64 flex items-end space-x-2">
              {salesData.map((data, index) => (
                <div key={index} className="relative flex flex-col items-center flex-grow">
                  <div className="flex flex-col items-center">
                    <div className="h-40 w-full bg-blue-500 rounded-t-sm" style={{ height: `${data.revenue / 1000}px` }}></div>
                    <div className="h-40 w-full bg-green-400 rounded-t-sm mt-1" style={{ height: `${data.orders / 30}px` }}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">{data.month}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></div>
                <span className="text-xs text-gray-500">Revenue</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-sm mr-1"></div>
                <span className="text-xs text-gray-500">Orders</span>
              </div>
            </div>
          </div>

          {/* Inventory Alerts */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Low Stock Alerts</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inventoryAlerts.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.product}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.sku}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          {item.stock} left
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-800">Restock</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All Orders</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${order.total.toFixed(2)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                      <button className="text-gray-600 hover:text-gray-800">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; 2025 E-Commerce Admin Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;