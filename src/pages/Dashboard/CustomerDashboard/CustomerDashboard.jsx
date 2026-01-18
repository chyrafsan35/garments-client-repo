import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    PieChart, Pie, Cell,
    BarChart, Bar, ResponsiveContainer
} from 'recharts';
import useAuth from '../../../hook/useAuth';
import axiosSecure from '../../../hook/axiosSecure';
import Loading from '../../../components/Loading/Loading';

const COLORS = ['#3b82f6', '#22c55e', '#facc15', '#ef4444', '#a855f7'];

const CustomerDashboard = () => {
    const { user } = useAuth();
    const useAxios = axiosSecure();

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['my-orders-dashboard', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await useAxios.get(`/my-orders?email=${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;const totalOrders = orders.length;

    const totalSpent = orders.reduce(
        (sum, o) => sum + Number(o.totalAmount || 0),
        0
    );

    const totalItems = orders.reduce(
        (sum, o) => sum + Number(o.orderQuantity || 0),
        0
    );

    const pendingOrders = orders.filter(
        o => o.orderStatus === 'Pending'
    ).length;const spendingOverTimeMap = {};

    orders.forEach(order => {
        if (!order.createdAt) return;
        const date = new Date(order.createdAt);
        const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
        spendingOverTimeMap[month] = (spendingOverTimeMap[month] || 0) + Number(order.totalAmount || 0);
    });

    const lineChartData = Object.keys(spendingOverTimeMap)
        .sort((a, b) => new Date(a) - new Date(b))
        .map(month => ({
            month,
            amount: spendingOverTimeMap[month]
        }));

  
    const statusMap = {};

    orders.forEach(order => {
        const status = order.orderStatus || 'Unknown';
        statusMap[status] = (statusMap[status] || 0) + 1;
    });

    const pieData = Object.entries(statusMap).map(([name, value]) => ({
        name,
        value
    }));


    const spendingByProduct = {};
    const quantityByProduct = {};

    orders.forEach(order => {
        const product = order.productTitle || 'Unknown';
        spendingByProduct[product] = (spendingByProduct[product] || 0) + Number(order.totalAmount || 0);
        quantityByProduct[product] = (quantityByProduct[product] || 0) + Number(order.orderQuantity || 0);
    });

    const spendingChartData = Object.keys(spendingByProduct).map(product => ({
        name: product,
        amount: spendingByProduct[product]
    }));

    const quantityChartData = Object.keys(quantityByProduct).map(product => ({
        name: product,
        quantity: quantityByProduct[product]
    }));


    return (
        <div className="p-6 space-y-8">

            <h2 className="text-3xl font-semibold text-primary text-center">
                Customer Dashboard
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-base-100 shadow rounded-xl p-6 text-center">
                    <p className="text-gray-500">Total Orders</p>
                    <h3 className="text-3xl font-bold">{totalOrders}</h3>
                </div>

                <div className="bg-base-100 shadow rounded-xl p-6 text-center">
                    <p className="text-gray-500">Total Spent</p>
                    <h3 className="text-3xl font-bold">৳ {totalSpent}</h3>
                </div>

                <div className="bg-base-100 shadow rounded-xl p-6 text-center">
                    <p className="text-gray-500">Total Items Purchased</p>
                    <h3 className="text-3xl font-bold">{totalItems}</h3>
                </div>

                <div className="bg-base-100 shadow rounded-xl p-6 text-center">
                    <p className="text-gray-500">Pending Orders</p>
                    <h3 className="text-3xl font-bold">{pendingOrders}</h3>
                </div>
            </div>

            <div className="bg-base-100 shadow rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                    Spending Over Time
                </h3>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={lineChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="amount"
                            stroke="#3b82f6"
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className="bg-base-100 shadow rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">
                        Order Status Breakdown
                    </h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {pieData.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-base-100 shadow rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">
                        Spending by Product
                    </h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={spendingChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="amount" fill="#22c55e" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>

            <div className="bg-base-100 shadow rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                    Quantity Purchased by Product
                </h3>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={quantityChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="quantity" fill="#facc15" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default CustomerDashboard;
