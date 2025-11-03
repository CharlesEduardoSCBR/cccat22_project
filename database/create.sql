drop schema if exists ccca CASCADE;
create schema IF NOT EXISTS ccca;

create table ccca.account (
    account_id uuid primary key,
    name text,
    password text,
    email text,
    document text
);

create table ccca.account_asset (
    account_id uuid,
    asset_id text,
    quantity integer,
    primary key (account_id, asset_id)
);

create table ccca.order (
    order_id uuid,
    market_id text,
    account_id uuid,
    side text,
    quantity numeric,
    price numeric,
    fill_quantity numeric,
    fill_price numeric,
    status text,
    timestamp timestamptz,
    primary key (order_id)
);