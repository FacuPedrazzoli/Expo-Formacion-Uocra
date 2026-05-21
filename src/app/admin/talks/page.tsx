'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Clock, MapPin, User, Mic, Filter, Calendar } from 'lucide-react';
import { useTalks } from '@/hooks/useTalks';
import eventData from '@/data/event-data.json';

export default function TalksAdminPage() {
  const { talks, loading } = useTalks();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<string>('all');

  const rooms = useMemo(() => {
    const uniqueRooms = [...new Set(talks.map((talk) => talk.room))];
    return ['all', ...uniqueRooms];
  }, [talks]);

  const filteredTalks = useMemo(() => {
    return talks.filter((talk) => {
      const matchesSearch =
        talk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        talk.speaker?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        talk.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRoom = selectedRoom === 'all' || talk.room === selectedRoom;
      return matchesSearch && matchesRoom;
    });
  }, [talks, searchTerm, selectedRoom]);

  const groupedTalks = useMemo(() => {
    const grouped: Record<string, typeof filteredTalks> = {};
    filteredTalks.forEach((talk) => {
      if (!grouped[talk.room]) {
        grouped[talk.room] = [];
      }
      grouped[talk.room].push(talk);
    });
    return grouped;
  }, [filteredTalks]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="mb-8">
          <div className="h-9 w-48 bg-muted rounded-lg mb-2" />
          <div className="h-5 w-72 bg-muted rounded" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-white rounded-2xl shadow-sm" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#124565] mb-2">Charlas</h1>
        <p className="text-muted-foreground">
          Gestión y visualización de las Charlas de Expo Formación UOCRA
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-0 shadow-lg shadow-[#124565]/10 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#124565] to-[#25848d]" />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Charlas</p>
                <p className="text-4xl font-bold text-[#124565]">{talks.length}</p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#124565] to-[#25848d] flex items-center justify-center shadow-lg shadow-primary/30">
                <Mic className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg shadow-[#25848d]/10 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#25848d] to-[#56bcb8]" />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Salas</p>
                <p className="text-4xl font-bold text-[#25848d]">{rooms.length - 1}</p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#25848d] to-[#56bcb8] flex items-center justify-center shadow-lg shadow-secondary/30">
                <MapPin className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg shadow-[#D4A853]/10 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D4A853] to-[#E8C47A]" />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fecha</p>
                <p className="text-lg font-bold text-[#D4A853]">{eventData.eventInfo.date}</p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#D4A853] to-[#E8C47A] flex items-center justify-center shadow-lg shadow-accent/30">
                <Calendar className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg shadow-[#124565]/10 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#124565] to-[#D4A853]" />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ubicación</p>
                <p className="text-lg font-bold text-[#124565] truncate">{eventData.eventInfo.location}</p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#124565] to-[#D4A853] flex items-center justify-center shadow-lg shadow-primary/30">
                <MapPin className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[#e8e6e1] shadow-sm mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#124565]">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar por título, expositor o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 focus:border-[#124565] focus:ring-[#124565]"
                />
              </div>
            </div>
            <div className="w-full md:w-64">
              <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus:border-[#124565] focus:ring-3 focus:ring-ring/50"
              >
                {rooms.map((room) => (
                  <option key={room} value={room}>
                    {room === 'all' ? 'Todas las salas' : room}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">
              Mostrando {filteredTalks.length} de {talks.length} charlas
            </span>
          </div>
        </CardContent>
      </Card>

      {Object.keys(groupedTalks).length === 0 ? (
        <Card className="border-[#e8e6e1] shadow-sm p-12 text-center">
          <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-[#124565] to-[#25848d] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
            <Mic className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#124565] mb-2">No hay charlas</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            No se encontraron charlas que coincidan con los filtros seleccionados
          </p>
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedTalks).map(([room, roomTalks], index) => (
            <div key={room}>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-[#e8e6e1] to-transparent" />
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#124565] to-[#25848d] text-white shadow-lg">
                  <MapPin className="h-4 w-4" />
                  <span className="font-semibold">{room}</span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-l from-[#e8e6e1] to-transparent" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roomTalks.map((talk) => (
                  <Card
                    key={talk.id}
                    className="border-[#e8e6e1] shadow-sm hover:shadow-lg hover:shadow-[#124565]/10 transition-all duration-300 overflow-hidden"
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${
                        index % 4 === 0
                          ? 'from-[#124565] to-[#25848d]'
                          : index % 4 === 1
                          ? 'from-[#25848d] to-[#56bcb8]'
                          : index % 4 === 2
                          ? 'from-[#D4A853] to-[#E8C47A]'
                          : 'from-[#124565] to-[#D4A853]'
                      }`}
                    />
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg text-[#124565] line-clamp-2">
                          {talk.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4 text-[#25848d]" />
                          <span className="font-medium text-foreground">{talk.speaker}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 text-[#D4A853]" />
                          <span>
                            {talk.startTime} - {talk.endTime}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {talk.description}
                        </p>
                        <div className="flex items-center justify-between pt-2 border-t border-[#e8e6e1]">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              talk.room === 'Salón Principal'
                                ? 'bg-[#124565]/10 text-[#124565]'
                                : 'bg-[#25848d]/10 text-[#25848d]'
                            }`}
                          >
                            {talk.room}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-[#124565] to-[#25848d] text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">Resumen del Programa</h3>
            <p className="text-white/80 text-sm">
              {eventData.eventInfo.date} - {eventData.eventInfo.location}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{talks.length}</p>
              <p className="text-xs text-white/80">Charlas</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold">{rooms.length - 1}</p>
              <p className="text-xs text-white/80">Salas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
