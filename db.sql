-- Create Table City 

create table city (
	id integer not null,
	name character varying not null
);

alter table city add constraint city_pkey primary key(id);

-- Create Table District 

create table district (
	id integer not null,
	name character varying not null,
	city_id integer not null
);

alter table district add constraint district_pkey primary key(id);
alter table district add constraint district_fkey_city foreign key (city_id) references city (id);

-- Create Table Ward 

create table ward (
	id integer not null,
	name character varying not null,
	district_id integer not null
);

alter table ward add constraint ward_pkey primary key (id);
alter table ward add constraint ward_fkey_district foreign key (district_id) references district (id);

-- Create Table Role 

-- create sequence role_id_seq start with 1 increment by 1 minvalue 1 maxvalue 999999999 cache 1;
--	id integer default nextval('role_id_seq'::regClass) not null,

create table role (
	id integer not null,
	role character varying not null
);

alter table role add constraint role_pkey primary key (id);

insert into role values(1, 'ADMIN');
insert into role values(2, 'HR');
insert into role values(3, 'USER');

-- Create Table Partner 

create sequence partner_id_seq start with 1 increment by 1 minvalue 1 maxvalue 999999999 cache 1;

create table partner (
	id integer default nextval('partner_id_seq'::regClass) not null,
	username character varying not null,
	password character varying not null,
	fullname character varying ,
	email character varying not null unique,
	phone character varying not null unique
);

alter table partner add column create_date timestamp default now();
alter table partner add column update_date timestamp default now();
alter table partner add constraint partner_pkey primary key (id);

-- Create Table Partner Roles

create table partner_roles (
	partner_id integer not null,
	role_id integer not null
);

alter table partner_roles add constraint partner_role_pkey primary key (partner_id, role_id);
alter table partner_roles add constraint partner_role_fkey_partner foreign key (partner_id) references partner (id);
alter table partner_roles add constraint partner_role_fkey_role foreign key (role_id) references role (id);

-- Create Table Post Request 

create sequence post_request_id_seq start with 1 increment by 1 minvalue 1 maxvalue 999999999 cache 1;

create table post_request (
	id integer default nextval('post_request_id_seq'::regClass) not null,
	title character varying not null,
	partner_id integer not null,
	content text
);

alter table post_request add column create_date timestamp default now();
alter table post_request add column update_date timestamp default now();
alter table post_request add constraint post_request_pkey primary key (id);
alter table post_request add constraint post_request_fkey_partner foreign key (partner_id) references partner (id);

-- Create Table Post

create sequence post_id_seq start with 1 increment by 1 minvalue 1 maxvalue 999999999 cache 1;

create table post (
	id integer default nextval('post_id_seq'::regClass) not null,
	title character varying not null,
	content text not null,
	image_url character varying,
	is_public boolean not null,
	state character varying,
	slug character varying not null,
	author_id integer not null
);

alter table post add column is_deleted boolean default false;
alter table post add column create_date timestamp default now();
alter table post add column update_date timestamp default now();
alter table post add constraint post_pkey primary key(id);
alter table post add constraint post_fkey_partner foreign key (author_id) references partner (id);

-- Create Table Job

create sequence job_id_seq start with 1 increment by 1 minvalue 1 maxvalue 999999999 cache 1;

create table job (
	id integer default nextval('job_id_seq'::regClass) not null,
	title character varying not null,
	content text not null,
	level character varying not null,
	is_public boolean not null,
	slug character varying not null,
	city_id integer not null,
	district_id integer not null,
	ward_id integer not null,
	street character varying,
	zip integer,
	author_id integer not null
);

alter table job add column create_date timestamp default now();
alter table job add column update_date timestamp default now();
alter table job add constraint job_pkey primary key(id);
alter table job add constraint job_fkey_city foreign key(city_id) references city (id);
alter table job add constraint job_fkey_district foreign key (district_id) references district (id);
alter table job add constraint job_fkey_ward foreign key (ward_id) references ward (id);
alter table job add constraint job_fkey_partner foreign key (author_id) references partner (id);

-- Create Table Tag

create sequence tag_id_seq start with 1 increment 1 minvalue 1 maxvalue 999999999 cache 1;

create table tag (
	id integer default('tag_id_seq'::regClass) not null,
	title character varying not null,
	slug character varying not null
);

alter table tag add column create_date timestamp default now();
alter table tag add column update_date timestamp default now();
alter table tag add constraint tag_pkey primary key (id);

-- Create Table Post Tag

create table post_tags (
	post_id integer not null,
	tag_id integer not null
);

alter table post_tags add constraint post_tags_pkey primary key (post_id, tag_id);
alter table post_tags add constraint post_tags_fkey_tag foreign key (tag_id) references tag (id);
alter table post_tags add constraint post_tags_fkey_post foreign key (post_id) references post (id);

-- Create Table Subcriber

create sequence subcriber_id_seq start with 1 increment by 1 minvalue 1 maxvalue 999999999 cache 1;

create table subcriber (
	id integer default nextval('subcriber_id_seq'::regClass) not null,
	email character varying not null unique
);

alter table subcriber add column create_date timestamp default now();
alter table subcriber add column update_date timestamp default now();
alter table subcriber add constraint subcriber_pkey primary key (id);


-- Create Table Category 

create sequence category_id_seq start with 1 increment by 1 minvalue 1 maxvalue 999999999 cache 1;

create table category (
	id integer default nextval('category_id_seq'::regClass) not null,
	title character varying not null,
	slug character varying not null,
	parent_id integer
);

alter table category add column create_date timestamp default now();
alter table category add column update_date timestamp default now();
alter table category add constraint category_pkey primary key (id);
alter table category add constraint category_fkey_category foreign key (parent_id) references category (id);

-- Create Table Post_Category 

create table post_category (
	post_id integer not null,
	category_id integer not null
);

alter table post_category add constraint post_category_pkey primary key (post_id, category_id);
alter table post_category add constraint post_category_fkey_category foreign key (category_id) references category(id);
alter table post_category add constraint post_category_pkey_post foreign key (post_id) references post (id);

-- Create Table Comment 

create sequence comment_id_seq start with 1 increment by 1 minvalue 1 maxvalue 999999999 cache 1;

create table comment (
	id integer default nextval('comment_id_seq'::regClass) not null,
	partner_id integer not null,
	post_id integer not null,
	comment character varying not null
);

alter table comment add column create_date timestamp default now();
alter table comment add column update_date timestamp default now();
alter table comment add constraint comment_pkey primary key (id);
alter table comment add constraint comment_fkey_partner foreign key (partner_id) references partner (id);
alter table comment add constraint comment_fkey_post foreign key (post_id) references post (id);
