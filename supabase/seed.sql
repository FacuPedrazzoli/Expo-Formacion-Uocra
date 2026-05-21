-- =============================================================================
-- EXPO FORMACIÓN UOCRA - SEED DATA FOR LOCAL TESTING
-- Run this after schema.sql in Supabase SQL Editor or local DB
-- =============================================================================

-- =============================================================================
-- 1. CLEAR EXISTING DATA (optional - for clean slate)
-- =============================================================================

-- DELETE FROM talk_registrations;
-- DELETE FROM survey_answers;
-- DELETE FROM users;
-- DELETE FROM talks;
-- DELETE FROM stands;
-- DELETE FROM sponsors;
-- DELETE FROM survey_questions;
-- DELETE FROM gallery;
-- DELETE FROM event_content;
-- DELETE FROM event_stats;
-- DELETE FROM events;
-- DELETE FROM how_found;

-- =============================================================================
-- 2. SEED EVENTS
-- =============================================================================

INSERT INTO events (year, title, description, location, date, active, registration_open)
VALUES 
    (2026, 'Expo Formación UOCRA 2026', 'El evento anual de formación profesional para el sector de la construcción', 'Centro de Convenciones Córdoba', '2026-10-15', true, true),
    (2025, 'Expo Formación UOCRA 2025', 'Evento anual de formación profesional', 'Centro de Convenciones Córdoba', '2025-10-15', false, false)
ON CONFLICT (year) DO NOTHING;

-- =============================================================================
-- 3. SEED HOW_FOUND OPTIONS
-- =============================================================================

INSERT INTO how_found (label, sort_order, active)
VALUES 
    ('Redes sociales', 1, true),
    ('Boca a boca', 2, true),
    ('Correo electrónico', 3, true),
    ('Carteleria/Volantes', 4, true),
    ('Otro', 5, true)
ON CONFLICT DO NOTHING;

-- =============================================================================
-- 4. SEED USERS (Test participants)
-- =============================================================================

INSERT INTO users (event_id, dni, name, lastname, email, phone, user_type, how_found_id)
SELECT 
    e.id,
    u.dni,
    u.name,
    u.lastname,
    u.email,
    u.phone,
    u.user_type,
    hf.id
FROM events e
CROSS JOIN (
    VALUES 
        ('12345678', 'Juan', 'Pérez', 'juan.perez@email.com', '+54 11 1234-5678', 'web', 'Redes sociales'),
        ('23456789', 'María', 'González', 'maria.gonzalez@email.com', '+54 11 2345-6789', 'web', 'Boca a boca'),
        ('34567890', 'Carlos', 'Rodríguez', 'carlos.rodriguez@email.com', '+54 11 3456-7890', 'manual', 'Carteleria/Volantes'),
        ('45678901', 'Ana', 'López', 'ana.lopez@email.com', '+54 11 4567-8901', 'web', 'Correo electrónico'),
        ('56789012', 'Pedro', 'Sánchez', 'pedro.sanchez@email.com', '+54 11 5678-9012', 'manual', 'Otro')
) AS u(dni, name, lastname, email, phone, user_type, how_found_label)
LEFT JOIN how_found hf ON hf.label = u.how_found_label
WHERE e.active = true
ON CONFLICT (event_id, dni) DO NOTHING;

-- =============================================================================
-- 5. SEED TALKS
-- =============================================================================

INSERT INTO talks (event_id, title, description, speaker_name, start_time, end_time, capacity, room, active)
SELECT 
    e.id,
    t.title,
    t.description,
    t.speaker,
    e.date + t.start_time::interval,
    e.date + t.end_time::interval,
    t.capacity,
    t.room,
    true
FROM events e
CROSS JOIN (
    VALUES 
        ('Introducción a la Construcción Sustentable', 'Aprende los fundamentos de la construcción verde y sostenible', 'Ing. María González', '09:00', '10:00', 50, 'Sala A'),
        ('Normativas de Seguridad en Altura', 'Protocolos y equipamiento para trabajos en altura', 'Lic. Carlos Rodríguez', '10:30', '11:30', 40, 'Sala B'),
        ('Digitalización en la Construcción', 'Herramientas digitales para gestionar obras', 'Ing. Pedro Sánchez', '12:00', '13:00', 35, 'Sala A'),
        ('Gestión de Residuos de Construcción', 'Cómo reducir el impacto ambiental de las obras', 'Dra. Ana López', '14:00', '15:00', 45, 'Sala C'),
        ('Nuevas Tecnologías en Materiales', 'Innovaciones en materiales de construcción', 'Dr. Roberto Martínez', '15:30', '16:30', 40, 'Sala B'),
        ('Formación Profesional y Mercado Laboral', 'El rol de la formación profesional en el sector', 'Lic. Laura Fernández', '17:00', '18:00', 60, 'Auditorio Principal')
) AS t(title, description, speaker, start_time, end_time, capacity, room)
WHERE e.active = true
ON CONFLICT DO NOTHING;

-- =============================================================================
-- 6. SEED STANDS
-- =============================================================================

INSERT INTO stands (event_id, name, description, category, booth_number, sort_order, active)
SELECT 
    e.id,
    s.name,
    s.description,
    s.category,
    s.booth,
    s.sort_order,
    true
FROM events e
CROSS JOIN (
    VALUES 
        ('Ferrimax', 'Materiales de construcción y herramientas', 'Materiales', 'A1', 1),
        ('Cemento Córdoba', 'Cemento y prefabricados de concreto', 'Materiales', 'A2', 2),
        ('Seguridad Laboral SA', 'Equipos de protección personal', 'Seguridad', 'B1', 3),
        ('Techos Argentina', 'Sistemas de cubierta y tejados', 'Techos', 'B2', 4),
        ('Aire Acondicionado Pro', 'Instalaciones HVAC industriales', 'Instalaciones', 'C1', 5),
        ('Pinturas del Centro', 'Pinturas y revestimientos decorativos', 'Acabados', 'C2', 6),
        ('Ferramientas Eléctricas', 'Herramientas motoras para construcción', 'Herramientas', 'D1', 7),
        ('Electricidad Industrial', 'Materiales y equipos eléctricos', 'Electricidad', 'D2', 8)
) AS s(name, description, category, booth, sort_order)
WHERE e.active = true
ON CONFLICT DO NOTHING;

-- =============================================================================
-- 7. SEED SPONSORS
-- =============================================================================

INSERT INTO sponsors (event_id, name, tier, sort_order, active)
SELECT 
    e.id,
    s.name,
    s.tier,
    s.sort_order,
    true
FROM events e
CROSS JOIN (
    VALUES 
        ('Ministerio de Trabajo', 'platinum', 1),
        ('Cámara de la Construcción', 'platinum', 2),
        ('Sistema S', 'gold', 3),
        ('Industrias Metalúrgicas SA', 'gold', 4),
        ('Banco de la Nación', 'silver', 5),
        ('Mutual de Obreros', 'bronze', 6),
        ('Proveedores Asociados', 'support', 7)
) AS s(name, tier, sort_order)
WHERE e.active = true
ON CONFLICT DO NOTHING;

-- =============================================================================
-- 8. SEED SURVEY QUESTIONS
-- =============================================================================

INSERT INTO survey_questions (event_id, question, question_type, options, required, sort_order, active)
SELECT 
    e.id,
    q.question,
    q.question_type,
    q.options,
    q.required,
    q.sort_order,
    true
FROM events e
CROSS JOIN (
    VALUES 
        ('¿Cómo evaluarías el evento en general?', 'rating', '[]'::jsonb, true, 1),
        ('¿Qué tan útiles fueron las charlas?', 'rating', '[]'::jsonb, true, 2),
        ('¿Cómo calificarías la organización?', 'rating', '[]'::jsonb, true, 3),
        ('¿El venue fue adecuado?', 'rating', '[]'::jsonb, true, 4),
        ('¿Recomendarías este evento?', 'select', '["Sí, sin duda", "Tal vez", "No"]'::jsonb, true, 5),
        ('¿Tenés algún comentario adicional?', 'text', '[]'::jsonb, false, 6)
) AS q(question, question_type, options, required, sort_order)
WHERE e.active = true
ON CONFLICT DO NOTHING;

-- =============================================================================
-- 9. SEED GALLERY
-- =============================================================================

INSERT INTO gallery (event_id, title, description, image_url, sort_order, active)
SELECT 
    e.id,
    g.title,
    g.description,
    g.image_url,
    g.sort_order,
    true
FROM events e
CROSS JOIN (
    VALUES 
        ('Entrada Principal', 'Vista de la entrada del evento', 'https://example.com/gallery/entrada.jpg', 1),
        ('Sala de Charlas', 'Auditorio principal con asistencia', 'https://example.com/gallery/sala.jpg', 2),
        ('Stands de Expositores', 'Empresas exponiendo sus productos', 'https://example.com/gallery/stands.jpg', 3),
        ('Networking', 'Momento de conexión entre asistentes', 'https://example.com/gallery/networking.jpg', 4)
) AS g(title, description, image_url, sort_order)
WHERE e.active = true
ON CONFLICT DO NOTHING;

-- =============================================================================
-- 10. INITIALIZE EVENT STATS
-- =============================================================================

INSERT INTO event_stats (event_id, total_registered, total_checked_in, total_surveys_completed)
SELECT id, 0, 0, 0 FROM events WHERE active = true
ON CONFLICT (event_id) DO NOTHING;

-- =============================================================================
-- 11. VERIFICATION QUERIES
-- =============================================================================

SELECT '=== SEED DATA VERIFICATION ===' AS status;

SELECT 'events' AS table_name, COUNT(*) AS record_count FROM events
UNION ALL
SELECT 'users', COUNT(*) FROM users WHERE event_id = (SELECT id FROM events WHERE active = true)
UNION ALL
SELECT 'talks', COUNT(*) FROM talks WHERE event_id = (SELECT id FROM events WHERE active = true)
UNION ALL
SELECT 'stands', COUNT(*) FROM stands WHERE event_id = (SELECT id FROM events WHERE active = true)
UNION ALL
SELECT 'sponsors', COUNT(*) FROM sponsors WHERE event_id = (SELECT id FROM events WHERE active = true)
UNION ALL
SELECT 'survey_questions', COUNT(*) FROM survey_questions WHERE event_id = (SELECT id FROM events WHERE active = true)
UNION ALL
SELECT 'gallery', COUNT(*) FROM gallery WHERE event_id = (SELECT id FROM events WHERE active = true)
UNION ALL
SELECT 'how_found', COUNT(*) FROM how_found;

-- =============================================================================
-- END OF SEED DATA
-- =============================================================================
