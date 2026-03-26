export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid md:grid-cols-4 gap-6">
        <div className="p-6 border rounded-lg">
          <h3 className="text-2xl font-bold">0</h3>
          <p className="text-muted-foreground">Total Usuarios</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-2xl font-bold">0</h3>
          <p className="text-muted-foreground">Registrados</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-2xl font-bold">0</h3>
          <p className="text-muted-foreground">Check-in</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-2xl font-bold">0</h3>
          <p className="text-muted-foreground">Charlas</p>
        </div>
      </div>
    </div>
  );
}