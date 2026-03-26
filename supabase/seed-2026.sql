-- =============================================================================
-- EXPO FORMACIÓN UOCRA 2026 - DATA SEED SCRIPT
-- Run this in Supabase SQL Editor
-- =============================================================================

-- =============================================================================
-- 1. INSERT EVENTO 2026
-- =============================================================================

INSERT INTO events (
    year,
    title,
    description,
    location,
    date,
    active,
    registration_open
) VALUES (
    2026,
    'Expo Formación UOCRA 2026',
    'El evento anual de formación profesional para el sector de la construcción. Empresas, charlas técnicas, competencias y muestras en vivo.',
    'Centro de Convenciones Córdoba',
    '2026-10-15',
    true,
    true
) ON CONFLICT (year) DO NOTHING;

-- Get the event ID for use in subsequent inserts
DO $$
DECLARE
    event_id_val UUID;
BEGIN
    SELECT id INTO event_id_val FROM events WHERE year = 2026;
    RAISE NOTICE 'Event 2026 created with ID: %', event_id_val;
END $$;

-- =============================================================================
-- 2. INSERT STANDS (EMPRESAS)
-- =============================================================================

-- Empresas de Construcción
INSERT INTO stands (event_id, name, description, logo_url, website, category, booth_number, sort_order, active)
SELECT 
    e.id,
    emp.nombre,
    emp.descripcion,
    emp.logo,
    emp.url,
    'construccion',
    CONCAT('A', row_number() OVER ()),
    row_number() OVER (),
    true
FROM events e
CROSS JOIN (
    VALUES 
        ('Dun Dun', 'Mezcla de polímeros para colocación de ladrillos y bloques', 'https://dundun.com.ar/wp-content/uploads/2016/01/produtividade_1.png', 'https://dun-dun.com.ar/'),
        ('El Galgo', 'Empresa líder en fabricación de herramientas profesionales para pintura', 'https://media.licdn.com/dms/image/v2/C4E0BAQEKGI7i2yTcWQ/company-logo_200_200/company-logo_200_200/0/1631354576694?e=2147483647&v=beta&t=LM2Z7KoWPJjaKK-eFRmbXifMKtR6hsxKSXIzqEmm-7U', 'https://www.elgalgo.com.ar/'),
        ('Fischer', 'Empresa multinacional alemana líder en sistemas de fijación', 'https://www.fischer.com.ar/-/media/system/user-defined/og-images/fischer-og-image.png', 'https://www.fischer.com.ar'),
        ('Mekano', 'Diseño y fabricación de estructuras tubulares y andamios', 'https://mekano.com.ar/images/logo_nav-principal-cabecera.png', 'https://mekano.com.ar'),
        ('Retak', 'Ladrillos de Hormarquía Celular Curados en Autoclave (HCCA)', 'https://retak.com.ar/wp-content/uploads/2024/09/logo_retak_menu.svg', 'https://retak.com.ar/'),
        ('Tao', 'Tablero estructural con hojuelas de madera orientadas', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ0IrDtVEvrfo6kTdSQwFWIzKI4yG5FdYxWg&s', 'https://taopaneles.com/'),
        ('Sinteplast', 'Empresa líder de capitales nacionales en pinturas', 'https://http2.mlstatic.com/D_NQ_NP_996466-MLA70931999155_082023-O.webp', 'https://www.sinteplast.com.ar/'),
        ('Durlock', 'Líder en sistemas de construcción en seco', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2F5n_mS1D5foPebBFeD2y6goItHGHOmXlgQ&s', 'https://durlock.com/'),
        ('Saint Gobain', 'Empresa multinacional fabricante de materiales', 'https://www.hipco.com/wp-content/uploads/2020/07/Logo-Saint-Gobain.png', 'https://www.saint-gobain.ar/es'),
        ('Plavicon', 'Impermeabilizantes y materiales para construcción', 'https://www.plavicon.com/site/imagenes/logo.png', 'https://www.plavicon.com/site/index.php'),
        ('Ceramica San Lorenzo', 'Fabricación de cerámicas de calidad', 'https://ceramicasanlorenzo.com.ar/wp-content/themes/csl/images/logo.svg', 'https://ceramicasanlorenzo.com.ar/'),
        ('Loma Negra', 'Empresa líder en producción de cemento', 'https://www.lomanegra.com/wp-content/uploads/2022/08/logo-loma-negra.png', 'https://www.lomanegra.com/'),
        ('Acerbrag', 'Fabricación de productos de acero de alta calidad', 'https://www.acerbrag.com/imgs/logo-acerbrag.svg', 'https://www.acerbrag.com/'),
        ('Later-Cer', 'Grupo líder en fabricación de ladrillo cerámico', 'https://later-cersa.com.ar/wp-content/uploads/2022/07/Logo_Encabezado.png', 'https://later-cersa.com.ar/'),
        ('Aluar', 'Compañía de capitales nacionales en la industria del aluminio', 'https://www.aluar.com.ar/assets/sitio/img/aluar-logo.svg', 'https://www.aluar.com.ar/'),
        ('Klaukol', 'Líder en adhesivos y pastinas para pisos cerámicos', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5YiEH3V2n1UhpxqT6kuC2Tc76kppJIUme9g&s', 'https://arg.sika.com/klaukol'),
        ('Alba', 'Marca líder de pinturas decorativas', 'https://images.akzonobel.com/akzonobel-flourish/alba/ar/es/homepage/logo-alba-100.png?impolicy=.auto', 'https://www.alba.com.ar/es'),
        ('Bremen', 'Herramientas para profesionales de la construcción', 'https://bremenar.vtexassets.com/assets/vtex.file-manager-graphql/images/929679d8-6818-4504-a16d-d76ebbfe2bc8___df3a039fc3515b5732deac0cd682ba06.svg', 'https://www.brementools.com/'),
        ('PPA Bs As', 'Soluciones en automatismos de portones y seguridad', 'https://www.ppabsas.com.ar/img/logo-ppa.png', 'https://www.ppabsas.com.ar/')
) AS emp(nombre, descripcion, logo, url)
WHERE e.year = 2026
ON CONFLICT DO NOTHING;

-- Empresas Sanitarias
INSERT INTO stands (event_id, name, description, logo_url, website, category, booth_number, sort_order, active)
SELECT 
    e.id,
    emp.nombre,
    emp.descripcion,
    emp.logo,
    emp.url,
    'sanitarias',
    CONCAT('B', row_number() OVER ()),
    row_number() OVER (),
    true
FROM events e
CROSS JOIN (
    VALUES 
        ('Escorial', 'Empresa familiar dedicada a artefactos de cocción', 'https://escorial.com.ar/unregalo/img/logo-escorial.png', 'https://www.escorial.com.ar/'),
        ('Latyn', 'Distribución de griferías y equipamiento', 'https://www.latyn.net/img/logo_header.svg', 'https://www.latyn.net/'),
        ('Ferrum S.A.', 'Soluciones para baño, cocina y lavadero', 'https://ferrum.com/pub/media/athlete2/default/logo_fv.png', 'https://ferrum.com/'),
        ('Grupo DEMA', 'Empresa dinámica en el sector sanitario', 'https://www.grupodema.com.ar/bundles/app/front/resources/img/dema-logoSombra.jpg', 'https://www.grupodema.com.ar/'),
        ('Dinatecnica', 'Más de 55 años en soluciones de tuberías', 'https://http2.mlstatic.com/D_NQ_NP_758107-MLA43580721883_092020-O.webp', 'https://dinatecnica.com.ar/'),
        ('FV', 'Confort en baños y cocinas', 'https://ferrum.com/pub/media/athlete2/default/logo_fv.png', 'https://fvsa.com/')
) AS emp(nombre, descripcion, logo, url)
WHERE e.year = 2026
ON CONFLICT DO NOTHING;

-- Empresas Electricidad
INSERT INTO stands (event_id, name, description, logo_url, website, category, booth_number, sort_order, active)
SELECT 
    e.id,
    emp.nombre,
    emp.descripcion,
    emp.logo,
    emp.url,
    'electricidad',
    CONCAT('C', row_number() OVER ()),
    row_number() OVER (),
    true
FROM events e
CROSS JOIN (
    VALUES 
        ('Conextube', 'Productos para instalaciones eléctricas seguras', 'https://www.conextube.com/assets/imgs/logo-conextube-light-ss.svg', 'https://www.conextube.com/'),
        ('Schneider Electric', 'Sostenibilidad y Eficiencia energética', 'https://www.logo.wine/a/logo/Schneider_Electric/Schneider_Electric-Logo.wine.svg', 'https://www.se.com/'),
        ('Gralf', 'Instrumentos de medición y control eléctrico', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOqscXAy-E8-bqnun_6EhVQ7ydWj7_xj2SzA&s', 'https://www.gralf.com.ar'),
        ('Micro Control', 'Canalización y conectividad eléctrica', 'https://microcontrol.com.ar/storage/2023/11/isologo-microcontrol-180x80-1.png', 'https://microcontrol.com.ar/'),
        ('Zoloda', 'Soluciones en canalización eléctrica', 'https://www.zoloda.com.ar/wp-content/uploads/ICONO-1.png', 'https://www.zoloda.com.ar/'),
        ('Genrod', 'Tecnología y calidad en sector eléctrico', 'https://electricaoscar.com/images/default/productos/genrod52.jpg', 'https://fundacion.uocra.org/'),
        ('Cambre', 'Fabricante de material eléctrico', 'https://migluz.ar/wp-content/uploads/2023/01/logo-cambre.jpg', 'https://cambre.com.ar/')
) AS emp(nombre, descripcion, logo, url)
WHERE e.year = 2026
ON CONFLICT DO NOTHING;

-- Instituciones
INSERT INTO stands (event_id, name, description, logo_url, website, category, booth_number, sort_order, active)
SELECT 
    e.id,
    emp.nombre,
    emp.descripcion,
    emp.logo,
    emp.url,
    'instituciones',
    CONCAT('D', row_number() OVER ()),
    row_number() OVER (),
    true
FROM events e
CROSS JOIN (
    VALUES 
        ('Fundación UOCRA', 'ONG de formación profesional para trabajadores', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQriRNbgrf454MsqjE0gXKp86GTp8_vLhLacg&s', 'https://fundacion.uocra.org/'),
        ('UOCRA Mujeres', 'Asistencia a trabajadoras constructoras', 'https://mujeres.uocra.org/wp-content/uploads/2022/11/stickers_5.png', 'https://mujeres.uocra.org/'),
        ('MOECRA', 'Mutual para trabajadores constructores', 'https://mutual.uocra.org/wp-content/uploads/2023/09/cropped-LogoMOECRA.png', 'https://mutual.uocra.org/'),
        ('Construir TV', 'Canal temático sobre el mundo del trabajo', 'https://www.construirtv.com/wp-content/uploads/2017/09/logo-ctv.jpg', 'https://www.construirtv.com/'),
        ('Consejo de Bomberos', 'Protección Civil en Argentina', 'https://www.bomberosra.org.ar/wp-content/uploads/2023/06/logo-CNB.jpg.png', 'https://www.bomberosra.org.ar'),
        ('INET', 'Instituto Nacional de Educación Tecnológica', 'https://rfietp.educacion.gob.ar/imagenes/logo-inet.png', 'https://www.inet.edu.ar/'),
        ('CAMARCO', 'Cámara Argentina de la Construcción', 'https://www.camarco.org.ar/wp-content/uploads/2022/06/camarco.png', 'https://www.camarco.org.ar/')
) AS emp(nombre, descripcion, logo, url)
WHERE e.year = 2026
ON CONFLICT DO NOTHING;

-- =============================================================================
-- 3. INSERT CHARLAS (TALKS)
-- =============================================================================

INSERT INTO talks (
    event_id,
    title,
    description,
    speaker_name,
    start_time,
    end_time,
    capacity,
    room,
    active
)
SELECT 
    e.id,
    'Introducción a la Construcción Sustentable',
    'Aprende los fundamentos de la construcción verde y sostenible. Concientización sobre medio ambiente y prácticas sostenibles en el sector de la construcción.',
    'Ing. María González',
    e.date + INTERVAL '9 hours',
    e.date + INTERVAL '10 hours',
    50,
    'Sala A',
    true
FROM events e WHERE e.year = 2026
ON CONFLICT DO NOTHING;

INSERT INTO talks (
    event_id,
    title,
    description,
    speaker_name,
    start_time,
    end_time,
    capacity,
    room,
    active
)
SELECT 
    e.id,
    'Normativas de Seguridad en Altura',
    'Protocolos y equipamiento para trabajos en altura. Normativa vigente y mejores prácticas para prevenir accidentes.',
    'Lic. Carlos Rodríguez',
    e.date + INTERVAL '10 hours 30 minutes',
    e.date + INTERVAL '11 hours 30 minutes',
    40,
    'Sala B',
    true
FROM events e WHERE e.year = 2026
ON CONFLICT DO NOTHING;

INSERT INTO talks (
    event_id,
    title,
    description,
    speaker_name,
    start_time,
    end_time,
    capacity,
    room,
    active
)
SELECT 
    e.id,
    'Digitalización en la Construcción',
    'Herramientas digitales para gestionar obras. Software BIM, gestión de proyectos y tecnología aplicada.',
    'Ing. Pedro Sánchez',
    e.date + INTERVAL '12 hours',
    e.date + INTERVAL '13 hours',
    35,
    'Sala A',
    true
FROM events e WHERE e.year = 2026
ON CONFLICT DO NOTHING;

INSERT INTO talks (
    event_id,
    title,
    description,
    speaker_name,
    start_time,
    end_time,
    capacity,
    room,
    active
)
SELECT 
    e.id,
    'Gestión de Residuos de Construcción',
    'Cómo reducir el impacto ambiental de las obras. Economía circular y gestión de residuos peligrosos.',
    'Dra. Ana López',
    e.date + INTERVAL '14 hours',
    e.date + INTERVAL '15 hours',
    45,
    'Sala C',
    true
FROM events e WHERE e.year = 2026
ON CONFLICT DO NOTHING;

INSERT INTO talks (
    event_id,
    title,
    description,
    speaker_name,
    start_time,
    end_time,
    capacity,
    room,
    active
)
SELECT 
    e.id,
    'Nuevas Tecnologías en Materiales',
    'Innovaciones en materiales de construcción. Tendencias y avances en el sector.',
    'Ing. Roberto Fernández',
    e.date + INTERVAL '15 hours 30 minutes',
    e.date + INTERVAL '16 hours 30 minutes',
    40,
    'Sala B',
    true
FROM events e WHERE e.year = 2026
ON CONFLICT DO NOTHING;

INSERT INTO talks (
    event_id,
    title,
    description,
    speaker_name,
    start_time,
    end_time,
    capacity,
    room,
    active
)
SELECT 
    e.id,
    'Formación Profesional y Mercado Laboral',
    'El rol de la formación profesional en el sector construcción. Oportunidades y desafíos.',
    'Lic. Martín Torres',
    e.date + INTERVAL '17 hours',
    e.date + INTERVAL '18 hours',
    60,
    'Auditorio Principal',
    true
FROM events e WHERE e.year = 2026
ON CONFLICT DO NOTHING;

-- =============================================================================
-- 4. INSERT COMPETENCIAS (Como talks con tipo especial)
-- =============================================================================

INSERT INTO talks (
    event_id,
    title,
    description,
    speaker_name,
    start_time,
    end_time,
    capacity,
    room,
    active
)
SELECT 
    e.id,
    'Competencia: Montador Electricista Domiciliario',
    'Competición de armado de tableros eléctricos según normativa vigente. Evaluación de habilidades técnicas.',
    'Comité Evaluador IERIC',
    e.date + INTERVAL '13 hours',
    e.date + INTERVAL '14 hours',
    20,
    'Centro Evaluador',
    true
FROM events e WHERE e.year = 2026
ON CONFLICT DO NOTHING;

INSERT INTO talks (
    event_id,
    title,
    description,
    speaker_name,
    start_time,
    end_time,
    capacity,
    room,
    active
)
SELECT 
    e.id,
    'Competencia: Montador Sanitarista',
    'Desafíos reales de instalación sanitaria siguiendo normas de calidad y seguridad. Competencia entre Institutos.',
    'Comité Evaluador IERIC',
    e.date + INTERVAL '16 hours',
    e.date + INTERVAL '17 hours',
    20,
    'Centro Evaluador',
    true
FROM events e WHERE e.year = 2026
ON CONFLICT DO NOTHING;

-- =============================================================================
-- 5. ACTUALIZAR STATS DEL EVENTO
-- =============================================================================

SELECT update_event_stats((SELECT id FROM events WHERE year = 2026));

-- =============================================================================
-- VERIFICACIÓN
-- =============================================================================

SELECT 'Eventos' as tabla, COUNT(*) as total FROM events WHERE year = 2026
UNION ALL
SELECT 'Stands', COUNT(*) FROM stands WHERE event_id = (SELECT id FROM events WHERE year = 2026)
UNION ALL
SELECT 'Charlas', COUNT(*) FROM talks WHERE event_id = (SELECT id FROM events WHERE year = 2026);

-- =============================================================================
-- FIN DEL SCRIPT
-- =============================================================================