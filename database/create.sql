drop schema if exists ccca;
create schema ccca;

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