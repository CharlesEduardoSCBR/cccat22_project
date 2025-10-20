drop schema if exists ccca;
create schema ccca;

create table ccca.account (
    account_id serial primary key,
    name text,
    password text,
    email text,
    document text
);