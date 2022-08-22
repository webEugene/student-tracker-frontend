export default function getCompanyId() {
  const companyId = JSON.parse(localStorage.getItem('userInfo'));
  return companyId.company_id;
}
