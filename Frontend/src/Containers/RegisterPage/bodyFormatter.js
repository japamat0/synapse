/**
 * used to prepare the information collected from the form
 * for user creation via synapse client.
 */


const format = body => {
  const dob = body.birthdate.split('-');
  const appBody = {
    username: body.username,
    password: body.password,
    email: body.email,
    phone: body.phone,
    DOB: body.birthdate,
    firstName: body.firstName,
    lastName: body.lastName,
  }
  const synapseBody = {
    "logins": [
      {
        "email": body.email,
      }
    ],
    "phone_numbers": [
      body.phone,
      body.email
    ],
    "legal_names": [
      `${body.firstName} ${body.lastName}`
    ],
    "documents":[{
      "email": body.email,
      "phone_number": body.phone,
      "ip":"::1",
      "name": `${body.firstName} ${body.lastName}`,
      "alias": body.alias,
      "entity_type": body.entity_type,
      "entity_scope": body.entity_scope,
      "day": +dob[2],
      "month": +dob[1],
      "year": +dob[0],
      "address_street": body.address_street,
      "address_city": body.address_city,
      "address_subdivision": body.address_subdivision,
      "address_postal_code": body.address_postal_code,
      "address_country_code": 'US',
      "desired_scope": "SEND|RECEIVE|TIER|1",
      "doc_option_key": "INVESTOR_DOCS",
      "docs_key":  "GOVT_ID_ONLY",
      "virtual_docs": [{
          "document_value": body.SSN,
          "document_type": "SSN"
      }],
      "physical_docs":[{
          "document_value": body.govtId,
          "document_type": "GOVT_ID"
      }],
      "social_docs":[{
          "document_value": body.facebook,
          "document_type":"FACEBOOK"
      }]
    }],
    "extra": {
      "cip_tag":1,
      "is_business": false
    }
  };
  return ({ synapseBody, appBody });
}

export default format;
