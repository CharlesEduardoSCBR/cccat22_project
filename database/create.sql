drop schema if exists ccca;
create schema ccca;

create table ccca.account (
    id uuid primary key,
    name text,
    password text,
    email text,
    document text
);

create table ccca.account_asset {
    id uuid primary key,
    account_id uuid references ccca.account(id),
    asset_code text,
    quantity integer
};