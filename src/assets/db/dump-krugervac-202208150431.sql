--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

-- Started on 2022-08-15 04:31:33

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 3048 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 211 (class 1255 OID 32821)
-- Name: guardarusuario(jsonb); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.guardarusuario(usuario jsonb) RETURNS integer
    LANGUAGE plpgsql
    AS $$

declare idEmpleado integer;

begin 
	
	insert into empleado (cedula , nombres, apellidos, email, usuario, "password", vacunado, estado) values 
	(usuario ->> 'cedula', usuario ->> 'nombres', usuario ->> 'apellidos', usuario ->> 'email',
	usuario ->> 'usuario', usuario ->> 'password', (usuario ->> 'vacunado')::boolean , (usuario ->> 'estado')::boolean)
	returning id_empleado into idEmpleado;

	insert into rol_empleado(id_rol, id_empleado) values (2,idEmpleado);
return idEmpleado;
end
$$;


--
-- TOC entry 212 (class 1255 OID 32822)
-- Name: resgistrarvacuna(jsonb); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.resgistrarvacuna(vacuna jsonb) RETURNS integer
    LANGUAGE plpgsql
    AS $$

declare idVacunaEmpleado integer;

begin 
insert into empleado_vacuna(id_empleado, id_vacuna, fecha_vacunacion, dosis) values 
((vacuna ->> 'id_empleado')::int4, (vacuna ->> 'id_vacuna')::int4, (vacuna ->> 'fecha_vacunacion')::date, (vacuna ->> 'dosis')::int4)
returning id_empleado_vacuna into idVacunaEmpleado;

update empleado set vacunado = true where id_empleado = (vacuna ->> 'id_empleado')::int4;
return idVacunaEmpleado;
end
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 204 (class 1259 OID 24660)
-- Name: empleado; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.empleado (
    id_empleado integer NOT NULL,
    cedula character varying(10) NOT NULL,
    nombres character varying(40) NOT NULL,
    apellidos character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    usuario character varying(100) NOT NULL,
    fecha_nacimiento date,
    direccion_domicilio character varying(200),
    telefono_movil character varying(10),
    vacunado boolean DEFAULT false NOT NULL,
    estado boolean DEFAULT true NOT NULL
);


--
-- TOC entry 203 (class 1259 OID 24658)
-- Name: empleado_id_empleado_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.empleado_id_empleado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3049 (class 0 OID 0)
-- Dependencies: 203
-- Name: empleado_id_empleado_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.empleado_id_empleado_seq OWNED BY public.empleado.id_empleado;


--
-- TOC entry 210 (class 1259 OID 24700)
-- Name: empleado_vacuna; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.empleado_vacuna (
    id_empleado_vacuna integer NOT NULL,
    id_empleado integer NOT NULL,
    id_vacuna integer NOT NULL,
    fecha_vacunacion date NOT NULL,
    dosis integer NOT NULL
);


--
-- TOC entry 209 (class 1259 OID 24698)
-- Name: empleado_vacuna_id_empleado_vacuna_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.empleado_vacuna_id_empleado_vacuna_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3050 (class 0 OID 0)
-- Dependencies: 209
-- Name: empleado_vacuna_id_empleado_vacuna_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.empleado_vacuna_id_empleado_vacuna_seq OWNED BY public.empleado_vacuna.id_empleado_vacuna;


--
-- TOC entry 202 (class 1259 OID 24652)
-- Name: rol; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rol (
    id_rol integer NOT NULL,
    nombre_rol character varying(30)
);


--
-- TOC entry 206 (class 1259 OID 24674)
-- Name: rol_empleado; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rol_empleado (
    id_rol_usuario integer NOT NULL,
    id_rol integer NOT NULL,
    id_empleado integer NOT NULL
);


--
-- TOC entry 201 (class 1259 OID 24650)
-- Name: rol_id_rol_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.rol_id_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3051 (class 0 OID 0)
-- Dependencies: 201
-- Name: rol_id_rol_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.rol_id_rol_seq OWNED BY public.rol.id_rol;


--
-- TOC entry 205 (class 1259 OID 24672)
-- Name: rol_usuario_id_rol_usuario_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.rol_usuario_id_rol_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3052 (class 0 OID 0)
-- Dependencies: 205
-- Name: rol_usuario_id_rol_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.rol_usuario_id_rol_usuario_seq OWNED BY public.rol_empleado.id_rol_usuario;


--
-- TOC entry 200 (class 1259 OID 24639)
-- Name: s_rol; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.s_rol
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 208 (class 1259 OID 24692)
-- Name: vacuna; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vacuna (
    id_vacuna integer NOT NULL,
    nombre character varying(50) NOT NULL
);


--
-- TOC entry 207 (class 1259 OID 24690)
-- Name: vacuna_id_vacuna_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.vacuna_id_vacuna_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3053 (class 0 OID 0)
-- Dependencies: 207
-- Name: vacuna_id_vacuna_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.vacuna_id_vacuna_seq OWNED BY public.vacuna.id_vacuna;


--
-- TOC entry 2880 (class 2604 OID 24663)
-- Name: empleado id_empleado; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.empleado ALTER COLUMN id_empleado SET DEFAULT nextval('public.empleado_id_empleado_seq'::regclass);


--
-- TOC entry 2885 (class 2604 OID 24703)
-- Name: empleado_vacuna id_empleado_vacuna; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.empleado_vacuna ALTER COLUMN id_empleado_vacuna SET DEFAULT nextval('public.empleado_vacuna_id_empleado_vacuna_seq'::regclass);


--
-- TOC entry 2879 (class 2604 OID 24655)
-- Name: rol id_rol; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rol ALTER COLUMN id_rol SET DEFAULT nextval('public.rol_id_rol_seq'::regclass);


--
-- TOC entry 2883 (class 2604 OID 24677)
-- Name: rol_empleado id_rol_usuario; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rol_empleado ALTER COLUMN id_rol_usuario SET DEFAULT nextval('public.rol_usuario_id_rol_usuario_seq'::regclass);


--
-- TOC entry 2884 (class 2604 OID 24695)
-- Name: vacuna id_vacuna; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vacuna ALTER COLUMN id_vacuna SET DEFAULT nextval('public.vacuna_id_vacuna_seq'::regclass);


--
-- TOC entry 3036 (class 0 OID 24660)
-- Dependencies: 204
-- Data for Name: empleado; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.empleado VALUES (5, '1727402222', 'PAMELA GISSEL', 'VALENCIA FARI', 'pamelafar1000@hotmail.com', '$2a$10$R9TfIxOjSnekMyiJLyRXfe0GXBhe7o423u7xBWltx5pKc5eYF2heG', 'PGVALENCIA', NULL, '', '', false, true);
INSERT INTO public.empleado VALUES (7, '1726499799', 'DARIO XAVIER', 'CAICEDO MORALES', 'dario123@gmail.com', '$2a$10$vQ86ibJVdu6ZDbmli/ty2.mxgdDNdXiwd4dEVrQ0JwM6hyZkJnHI.', 'DXCAICEDO', NULL, NULL, NULL, false, true);
INSERT INTO public.empleado VALUES (8, '1712345678', 'DARWIN OSWALDO', 'CORDOVA CONTRERAS', 'darwincor123@hotmail.com', '$2a$10$1sudqgIoC7j.HifIqstRrupLVUUMF9BtAuozUCJuy435Fmd2pdmCm', 'DOCORDOVA', '1993-01-21', 'Condominios divino Nino', '0998867543', true, true);
INSERT INTO public.empleado VALUES (6, '1711083038', 'MARIO RODRIGO', 'PARRA SANTILLAN', 'mrodrigots644@gmail.com', '$2a$10$JFeZOHG0sqPn5enoSIX1m.PkCLgUlJy3wU12Ttvzs5uRgtOXAPrxq', 'MRPARRA', NULL, NULL, NULL, false, true);
INSERT INTO public.empleado VALUES (1, '1722305230', 'MIGUEL ANGEL', 'PARRA ORDONEZ', 'miguelts644@hotmail.com', '$2a$10$TwixvIAVm/uxiewFoMWX.O.7EkI56VFOq8x7WVubRwQUOumsikQ9W', 'MAPARRA', '1993-01-22', NULL, NULL, false, true);
INSERT INTO public.empleado VALUES (9, '1712345681', 'MARCELO PATRICIO', 'PUMA IBARDO', 'pumapatricio@gmail.com', '$2a$10$JCUV4KV3Cq4Wgn4Bc9hH7eF.FLV6kwiKKbWb4yZAqhMExz6TPCEPG', 'MPPUMA', NULL, NULL, NULL, false, true);


--
-- TOC entry 3042 (class 0 OID 24700)
-- Dependencies: 210
-- Data for Name: empleado_vacuna; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.empleado_vacuna VALUES (5, 8, 2, '2022-01-24', 2);
INSERT INTO public.empleado_vacuna VALUES (3, 8, 1, '2021-10-24', 1);


--
-- TOC entry 3034 (class 0 OID 24652)
-- Dependencies: 202
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.rol VALUES (1, 'ADMINISTRADOR');
INSERT INTO public.rol VALUES (2, 'EMPLEADO');


--
-- TOC entry 3038 (class 0 OID 24674)
-- Dependencies: 206
-- Data for Name: rol_empleado; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.rol_empleado VALUES (2, 1, 1);
INSERT INTO public.rol_empleado VALUES (3, 2, 5);
INSERT INTO public.rol_empleado VALUES (4, 2, 6);
INSERT INTO public.rol_empleado VALUES (5, 2, 7);
INSERT INTO public.rol_empleado VALUES (6, 2, 8);
INSERT INTO public.rol_empleado VALUES (7, 2, 9);


--
-- TOC entry 3040 (class 0 OID 24692)
-- Dependencies: 208
-- Data for Name: vacuna; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.vacuna VALUES (1, 'AstraZeneca');
INSERT INTO public.vacuna VALUES (2, 'Jhonson&Jhonson');
INSERT INTO public.vacuna VALUES (3, 'Pfizer');
INSERT INTO public.vacuna VALUES (4, 'Sputnik');


--
-- TOC entry 3054 (class 0 OID 0)
-- Dependencies: 203
-- Name: empleado_id_empleado_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.empleado_id_empleado_seq', 9, true);


--
-- TOC entry 3055 (class 0 OID 0)
-- Dependencies: 209
-- Name: empleado_vacuna_id_empleado_vacuna_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.empleado_vacuna_id_empleado_vacuna_seq', 8, true);


--
-- TOC entry 3056 (class 0 OID 0)
-- Dependencies: 201
-- Name: rol_id_rol_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rol_id_rol_seq', 2, true);


--
-- TOC entry 3057 (class 0 OID 0)
-- Dependencies: 205
-- Name: rol_usuario_id_rol_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rol_usuario_id_rol_usuario_seq', 7, true);


--
-- TOC entry 3058 (class 0 OID 0)
-- Dependencies: 200
-- Name: s_rol; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.s_rol', 1, false);


--
-- TOC entry 3059 (class 0 OID 0)
-- Dependencies: 207
-- Name: vacuna_id_vacuna_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.vacuna_id_vacuna_seq', 4, true);


--
-- TOC entry 2889 (class 2606 OID 24669)
-- Name: empleado empleado_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT empleado_pk PRIMARY KEY (id_empleado);


--
-- TOC entry 2891 (class 2606 OID 24671)
-- Name: empleado empleado_un; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT empleado_un UNIQUE (cedula);


--
-- TOC entry 2897 (class 2606 OID 24705)
-- Name: empleado_vacuna empleado_vacuna_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.empleado_vacuna
    ADD CONSTRAINT empleado_vacuna_pk PRIMARY KEY (id_empleado_vacuna);


--
-- TOC entry 2887 (class 2606 OID 24657)
-- Name: rol rol_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pk PRIMARY KEY (id_rol);


--
-- TOC entry 2893 (class 2606 OID 24679)
-- Name: rol_empleado rol_usuario_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rol_empleado
    ADD CONSTRAINT rol_usuario_pk PRIMARY KEY (id_rol_usuario);


--
-- TOC entry 2895 (class 2606 OID 24697)
-- Name: vacuna vacuna_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vacuna
    ADD CONSTRAINT vacuna_pk PRIMARY KEY (id_vacuna);


--
-- TOC entry 2900 (class 2606 OID 24706)
-- Name: empleado_vacuna empleado_vacuna_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.empleado_vacuna
    ADD CONSTRAINT empleado_vacuna_fk FOREIGN KEY (id_vacuna) REFERENCES public.vacuna(id_vacuna);


--
-- TOC entry 2901 (class 2606 OID 24711)
-- Name: empleado_vacuna empleado_vacuna_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.empleado_vacuna
    ADD CONSTRAINT empleado_vacuna_fk_1 FOREIGN KEY (id_empleado) REFERENCES public.empleado(id_empleado);


--
-- TOC entry 2898 (class 2606 OID 24680)
-- Name: rol_empleado rol_usuario_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rol_empleado
    ADD CONSTRAINT rol_usuario_fk FOREIGN KEY (id_rol) REFERENCES public.rol(id_rol);


--
-- TOC entry 2899 (class 2606 OID 24685)
-- Name: rol_empleado rol_usuario_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rol_empleado
    ADD CONSTRAINT rol_usuario_fk_1 FOREIGN KEY (id_empleado) REFERENCES public.empleado(id_empleado);


-- Completed on 2022-08-15 04:31:33

--
-- PostgreSQL database dump complete
--

