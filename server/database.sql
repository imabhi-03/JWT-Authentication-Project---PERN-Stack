create database jwt;

create table users(
    user_id uuid primary key default uuid_generate_v4()  , 
    user_name varchar(255) not null,
    user_email varchar(255) not null,
    user_password varchar(255) not null
);
