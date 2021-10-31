-- Create Table City 

create table city (
	id integer not null,
	name character varying not null
);

alter table city add constraint PK_CITY_ID primary key(id);

-- Create Table District 

create table district (
	id integer not null,
	name character varying not null,
	city_id integer not null
);

alter table district add constraint PK_DISTRICT_ID primary key(id);

alter table district add constraint FK_DISTRICT_CITY foreign key (city_id) references city (id);

-- Create Table Ward 

create table ward (
	id integer not null,
	name character varying not null,
	district_id integer not null
);

alter table ward add constraint PK_WARD_ID primary key (id);

alter table ward add constraint FK_WARD_DISTRICT foreign key (district_id) references district (id);

-- Create Table Role 

create sequence role_id_seq 
start with 1
increment by 1
minvalue 1
maxvalue 999999999
cache 1;

create table role (
	id integer default nextval('role_id_seq'::regClass) not null,
	role character varying not null
);

alter table role add constraint PK_ROLE_ID primary key (id);

-- Create Table Partner 

create sequence partner_id_seq
start with 1
increment by 1
minvalue 1
maxvalue 999999999
cache 1;

create table partner (
	id integer default nextval('partner_id_seq'::regClass) not null,
	username character varying not null,
	password character varying not null,
	fullname character varying ,
	email character varying not null unique,
	phone character varying not null unique,
	create_date timestamp default now(),
	update_date timestamp default now()
);

alter table partner add constraint PK_PARTNER_ID primary key (id);

-- Create Table Partner Roles

create table partner_roles (
	partner_id integer not null,
	role_id integer not null
);

alter table partner_roles add constraint PK_PARTNER_ROLE primary key (partner_id, role_id);

alter table partner_roles add constraint FK_PARTNER_ROLE_ID foreign key (partner_id) references partner(id);

alter table partner_roles add constraint FK_PARTNER_ROLE_ROLE_ID foreign key (role_id) references role(id);

-- Create Table Post Request 

create sequence post_request_id_seq
start with 1
increment by 1 
minvalue 1
maxvalue 999999999
cache 1;

create table post_request (
	id integer default nextval('post_request_id_seq'::regClass) not null,
	title character varying not null,
	partner_id integer not null,
	content text,
	create_date timestamp default now(),
	update_date timestamp default now()
);

alter table post_request add constraint PK_POST_REQUEST_ID primary key (id);

alter table post_request add constraint FK_POST_REQUEST_PARTNER foreign key (partner_id) references partner (id);

-- Create Table Job

create sequence job_id_seq 
start with 1
increment by 1 
minvalue 1
maxvalue 999999999
cache 1;

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

alter table job add constraint PK_JOB_ID primary key(id);

alter table job add constraint FK_JOB_CITY foreign key(city_id) references city (id);

alter table job add constraint FK_JOB_DISTRICT foreign key (district_id) references district (id);

alter table job add constraint FK_JOB_WARD foreign key (ward_id) references ward (id);

alter table job add constraint FK_JOB_PARTNER foreign key (author_id) references partner (id);

-- Create Table Tag

create sequence tag_id_seq 
start with 1
increment 1
minvalue 1
maxvalue 999999999
cache 1;

create table tag (
	id integer default('tag_id_seq'::regClass) not null,
	title character varying not null,
	slug character varying not null
);

alter table tag add column create_date timestamp default now();

alter table tag add column update_date timestamp default now();

alter table tag add constraint PK_TAG_ID primary key (id);

-- Create Table Subcriber

create sequence subcriber_id_seq 
start with 1 
increment by 1 
minvalue 1
maxvalue 999999999
cache 1;

create table subcriber (
	id integer default nextval('subcriber_id_seq'::regClass) not null,
	email character varying not null unique
);

alter table subcriber add column create_date timestamp default now();

alter table subcriber add column update_date timestamp default now();

alter table subcriber add constraint PK_SUBCRIBER_ID primary key (id);

-- Create Table Post

create sequence post_id_seq
start with 1
increment by 1
minvalue 1
maxvalue 999999999
cache 1;

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

alter table post add create_date timestamp default now();

alter table post add update_date timestamp default now();

alter table post add constraint PK_POST_ID primary key(id);

alter table post add constraint FK_POST_PARTNER foreign key (author_id) references partner (id);

-- Create Table Post Mailing 

create sequence post_mailing_id_seq start with 1 increment by 1 minvalue 1
maxvalue 999999999 cache 1;

create table post_mailing (
	id integer default nextval('post_mailing_id_seq'::regClass) not null,
	post_id integer not null,
	status character varying
);

alter table post_mailing add column create_date timestamp default now();

alter table post_mailing add column update_date timestamp default now();

alter table post_mailing add constraint PK_POST_MAILING_ID primary key(id);

alter table post_mailing add constraint FK_POST_MAILING_POST foreign key (post_id) references post (id);

-- Create Table Mailing List 

create table mailing_list(
	post_mailing_id integer not null,
	subcriber_id integer not null
);

alter table mailing_list add constraint PK_MAILING_LIST primary key(post_mailing_id, subcriber_id);

alter table mailing_list add constraint FK_MAILING_LIST_POST_MAILING foreign key (post_mailing_id) references post_mailing (id);

alter table mailing_list add constraint FK_MAILING_LIST_SUBCRIBER foreign key (subcriber_id) references subcriber (id);

-- Create Table Category 

create sequence category_id_seq start with 1 increment by 1 minvalue 1 maxvalue 999999999
cache 1;

create table category (
	id integer default nextval('category_id_seq'::regClass) not null,
	title character varying not null,
	slug character varying not null,
	parent_id integer
);

alter table category add create_date timestamp default now();

alter table category add update_date timestamp default now();

alter table category add constraint PK_CATEGORY_ID primary key (id);

alter table category add constraint FK_CATEGORY_CATEGORY foreign key (parent_id) references category (id);

-- Create Table Post_Category 

create table post_category (
	post_id integer not null,
	category_id integer not null
);

alter table post_category add constraint PK_POST_CATEGORY primary key (post_id, category_id);

alter table post_category add constraint FK_POST_CATEGORY_CATEGORY foreign key (category_id) references category(id);

alter table post_category add constraint FK_POST_CATEGORY_POST foreign key (post_id) references post (id);

-- Create Table Post Tag
create table post_tag (
	post_id integer not null,
	tag_id integer not null
);

alter table post_tag add constraint PK_POST_TAG primary key (post_id, tag_id);

alter table post_tag add constraint FK_POST_TAG_TAG foreign key (tag_id) references tag (id);

alter table post_tag add constraint FK_POST_TAG_POST foreign key (post_id) references post (id);


-- Create Table Comment 

create sequence comment_id_seq start with 1 increment by 1 minvalue 1 maxvalue 999999999 cache 1;

create table comment (
	id integer default nextval('comment_id_seq'::regClass) not null,
	partner_id integer not null,
	comment character varying not null
);

alter table comment add column create_date timestamp default now();

alter table comment add column update_date timestamp default now();

alter table comment add constraint PK_COMMENT primary key (id);

alter table comment add constraint FK_COMMENT_PARTNER foreign key (partner_id) references partner (id);

-- Create Table Post Comment

create table post_comment (
	post_id integer not null,
	comment_id integer not null
);

alter table post_comment add constraint PK_POST_COMMENT primary key (post_id, comment_id);

alter table post_comment add constraint FK_POST_COMMENT_POST foreign key (post_id) references post (id);

alter table post_comment add constraint FK_POST_COMMENT_COMMENT foreign key (comment_id) references comment (id);







