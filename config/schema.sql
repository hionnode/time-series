-- minimal schema some best practices are overlooked
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE org(
 org_id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
 name VARCHAR(40)
);
CREATE TABLE patients(
patient_id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
name VARCHAR(40),
org_id UUID references org(org_id) NOT NULL
);
CREATE TABLE data_list(
  data_id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  data_type VARCHAR(40) NOT NULL) UNIQUE;
CREATE TABLE series_data(
series_id SERIAL PRIMARY KEY,
time_stamp TIMESTAMPTZ NOT NULL,
data_id UUID references data_list(data_id) NOT NULL,
data_value INT,
patient_id UUID references patients(patient_id) NOT NULL
 );

-- data to seed this schema so that our requests can be run

INSERT INTO org(name) VALUES('test_org');
INSERT INTO patients(name,org_id) VALUES('test_patient','42291880-e379-4f43-8674-a1851272d8e8');
INSERT INTO data_list(data_type) VALUES('STEPS'),('HEART_RATE'),('WEIGHT'),('BLOOD_GLUCOSE_LEVELS'),('HEIGHT'),('BP');



