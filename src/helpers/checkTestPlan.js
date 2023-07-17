export default function isFreePlan() {
    const getPlanType = JSON.parse(localStorage.getItem('userInfo'));
    return getPlanType?.test_plan;
}
