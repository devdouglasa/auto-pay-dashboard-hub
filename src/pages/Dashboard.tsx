
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  LogOut,
  Users,
  FileText,
  Calendar
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  // Dados simulados para os gráficos
  const salesData = [
    { month: 'Jan', vendas: 45000, conclusoes: 38000, pendentes: 7000 },
    { month: 'Fev', vendas: 52000, conclusoes: 45000, pendentes: 7000 },
    { month: 'Mar', vendas: 48000, conclusoes: 41000, pendentes: 7000 },
    { month: 'Abr', vendas: 61000, conclusoes: 55000, pendentes: 6000 },
    { month: 'Mai', vendas: 58000, conclusoes: 52000, pendentes: 6000 },
    { month: 'Jun', vendas: 67000, conclusoes: 62000, pendentes: 5000 },
  ];

  const pieData = [
    { name: 'Concluídas', value: 75, color: '#10B981' },
    { name: 'Pendentes', value: 15, color: '#F59E0B' },
    { name: 'Canceladas', value: 10, color: '#EF4444' },
  ];

  const recentTransactions = [
    { id: '1', customer: 'João Silva', amount: 'R$ 1.250,00', status: 'Concluída', date: '2024-05-22' },
    { id: '2', customer: 'Maria Santos', amount: 'R$ 890,00', status: 'Pendente', date: '2024-05-22' },
    { id: '3', customer: 'Pedro Costa', amount: 'R$ 2.100,00', status: 'Concluída', date: '2024-05-21' },
    { id: '4', customer: 'Ana Oliveira', amount: 'R$ 750,00', status: 'Concluída', date: '2024-05-21' },
    { id: '5', customer: 'Carlos Lima', amount: 'R$ 1.800,00', status: 'Pendente', date: '2024-05-20' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PayFlow
              </span>
            </div>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta, {user.name.split(' ')[0]}! 👋
          </h2>
          <p className="text-gray-600">
            Aqui está um resumo das suas vendas e cobranças hoje
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">R$ 67.000</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendas Concluídas</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">R$ 62.000</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8.2%</span> vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendas Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">R$ 5.000</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">-15.3%</span> vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">92.5%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2.1%</span> vs mês anterior
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução de Vendas</CardTitle>
              <CardDescription>
                Comparativo mensal de vendas totais vs concluídas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, '']} />
                  <Line 
                    type="monotone" 
                    dataKey="vendas" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    name="Total de Vendas"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="conclusoes" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    name="Vendas Concluídas"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Status das Vendas</CardTitle>
              <CardDescription>
                Distribuição atual das vendas por status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-4 mt-4">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">
                      {item.name}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Transações Recentes</span>
            </CardTitle>
            <CardDescription>
              Últimas 5 transações processadas no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.customer}</p>
                      <p className="text-sm text-gray-500 flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(transaction.date).toLocaleDateString('pt-BR')}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{transaction.amount}</p>
                    <Badge 
                      variant={transaction.status === 'Concluída' ? 'default' : 'secondary'}
                      className={
                        transaction.status === 'Concluída' 
                          ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                          : 'bg-orange-100 text-orange-800 hover:bg-orange-100'
                      }
                    >
                      {transaction.status === 'Concluída' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {transaction.status === 'Pendente' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline">Ver Todas as Transações</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
