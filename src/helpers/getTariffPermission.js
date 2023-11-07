export default function getTariffPermission() {
    const tariffPermission = JSON.parse(localStorage.getItem('userInfo'));
    return tariffPermission.tariff_permission;
}
