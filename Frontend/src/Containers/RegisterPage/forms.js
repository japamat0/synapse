import React from 'react';
import styled from 'styled-components';

import Input from '../../Components/Forms/Input';
import Select from '../../Components/Forms/Select';
import { entityTypes, entityScopes, states } from './dropdownOptions';
import Span from '../../Components/Span';

const Spacer = styled.div`
  margin: 0.5em;
`;

const ReviewWrapper = styled.div`
  width: 95%;
`;

const EditFormWrapper = styled.span`
  margin-left: 1em;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export const basicInfo = (state, handleChange) => (
  <div>
    <h3>Basic Info</h3>
    <Input
      label="Username"
      name="username"
      type="text"
      value={state.username}
      onChange={handleChange}
      />
    <Input
      label="Password"
      name="password"
      type="password"
      value={state.password}
      onChange={handleChange}
      />
    <Input
      label="Email"
      name="email"
      type="email"
      value={state.email}
      onChange={handleChange}
      />
    <Input
      label="Phone Number"
      name="phone"
      type="tel"
      value={state.phone}
      onChange={handleChange}
      />
  </div>
);

export const personalInfo = (state, handleChange) => (
  <div>
    <h3>Personal Info</h3>
    <Input
      label="First Name"
      name="firstName"
      type="text"
      value={state.firstName}
      onChange={handleChange}
      />
    <Input
      label="Last Name"
      name="lastName"
      type="text"
      value={state.lastName}
      onChange={handleChange}
      />
    <Input
      label="Alias"
      name="alias"
      type="text"
      value={state.alias}
      onChange={handleChange}
      />
    <Input
      label="Date of Birth"
      name="birthdate"
      type="date"
      value={state.birthdate}
      onChange={handleChange}
      />
    <Select
      label="Entity Type"
      name="entity_type"
      type="text"
      options={entityTypes}
      value={state.entity_type}
      onChange={handleChange}
      />
    <Select
      label="Entity Scope"
      name="entity_scope"
      type="text"
      options={entityScopes}
      value={state.entity_scope}
      onChange={handleChange}
      />
  </div>
);

export const addressInfo = (state, handleChange) => (
  <div>
    <h3>Address Info</h3>
    <Input
      label="Street Address"
      name="address_street"
      type="text"
      value={state.address_street}
      onChange={handleChange}
      />
    <Input
      label="City"
      name="address_city"
      type="text"
      value={state.address_city}
      onChange={handleChange}
      />
    <Input
      label="Postal Code"
      name="address_postal_code"
      type="number"
      value={state.address_postal_code}
      onChange={handleChange}
      />
    <Select
      label="State"
      name="address_subdivision"
      type="text"
      options={states}
      value={state.address_subdivision}
      onChange={handleChange}
      />
  </div>
);

export const documents = (state, handleChange) => (
  <div>
    <h3>Identifying Documents</h3>
    <Input
      label="Facebook profile URL"
      name="facebook"
      type="text"
      value={state.facebook}
      onChange={handleChange}
      />
    <Input
      label="Government Issued ID"
      name="govtId"
      type="text"
      value={state.govtId}
      onChange={handleChange}
      />
    <Input
      label="Social Security Number"
      name="SSN"
      type="password"
      value={state.SSN}
      onChange={handleChange}
      />
    <Span fontSize='0.85em'>
      Convert your government ID to a <a href="https://www.base64-image.de/" target="_blank">base64 image</a>
    </Span>
  </div>
);

export const review = (state, editForm) => (
  <ReviewWrapper>
    <h2>Review</h2>
    <div>
      <h3>Basic information</h3>
      <Spacer>Username: {state.username}</Spacer>
      <Spacer>email: {state.email}</Spacer>
      <Spacer>phone: {state.phone}</Spacer>
      <EditFormWrapper>
        <Span color="#007fff" fontSize="0.85em" onClick={() => editForm(0)}>edit</Span>
      </EditFormWrapper>
    </div>
    <hr />
    <div>
      <h3>Personal information</h3>
      <Spacer>First Name: {state.firstName}</Spacer>
      <Spacer>Last Name: {state.lastName}</Spacer>
      <Spacer>Alias: {state.alias}</Spacer>
      <Spacer>birthdate: {state.birthdate}</Spacer>
      <Spacer>Entity Type: {state.entity_type}</Spacer>
      <Spacer>Entity Scope: {state.entity_scope}</Spacer>
      <EditFormWrapper>
        <Span color="#007fff" fontSize="0.85em" onClick={() => editForm(1)}>edit</Span>
      </EditFormWrapper>
    </div>
    <hr />
    <div>
      <h3>Address information</h3>
      <Spacer>Street Address: {state.address_street}</Spacer>
      <Spacer>City: {state.address_city}</Spacer>
      <Spacer>State: {state.address_subdivision}</Spacer>
      <Spacer>Postal Code: {state.address_postal_code}</Spacer>
      <EditFormWrapper>
        <Span color="#007fff" fontSize="0.85em" onClick={() => editForm(2)}>edit</Span>
      </EditFormWrapper>
    </div>
    <hr />
    <div>
      <h3>Documents information</h3>
      <Spacer>Facebook URL: {state.facebook}</Spacer>
      <Spacer>Government ID: {state.govtId}</Spacer>
      <Spacer>Social Security Number: {state.SSN}</Spacer>
      <EditFormWrapper>
        <Span color="#007fff" fontSize="0.85em" onClick={() => editForm(2)}>edit</Span>
      </EditFormWrapper>
    </div>
    <hr />
  </ReviewWrapper>
);

export const formViews = [
  'basicInfo',
  'personalInfo',
  'addressInfo',
  'documents',
  'review'
]

const formToShow = (formView, state, handleChange, editForm) => {
  switch (formView) {
    case 'basicInfo':
      return basicInfo(state, handleChange);

    case 'personalInfo':
      return personalInfo(state, handleChange);

    case 'addressInfo':
      return addressInfo(state, handleChange);

    case 'documents':
      return documents(state, handleChange);

    case 'review':
      return review(state, editForm);
  }
}

export default formToShow;