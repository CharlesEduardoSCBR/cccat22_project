drop schema if exists ccca;
create schema ccca;

create table ccca.account (
    id uuid primary key,
    name text,
    password text,
    email text,
    document text
);