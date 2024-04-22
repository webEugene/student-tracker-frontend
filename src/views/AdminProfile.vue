<template>
  <v-container fluid>
    <v-alert text type="info" max-width="900px" v-if="Boolean(user.company?.plan.plan)">
      {{ $t('alerts.toUsePlan') }} <strong>12.10.2023</strong>.
    </v-alert>
    <v-alert
      v-if="Boolean(user.company?.plan.plan)"
      text
      dense
      color="deep-orange"
      icon="mdi-clock-fast"
      border="left"
      max-width="900px"
    >
      {{ $t('alerts.remindToPayPlan') }} <strong>12.10.2023</strong>
    </v-alert>
    <v-alert v-if="Boolean(user.company?.plan.plan)" max-width="900px" type="error">
      {{ $t('alerts.notInTimePaidPlan') }} <strong>12.10.2023</strong>.
      {{ $t('alerts.payOrChangePlan') }}
    </v-alert>
    <h1 class="mb-3">{{ $t('general.pageAdmin') }}</h1>
    <!--  Short Admin info -->
    <v-card id="short-profile" max-width="900px" class="pa-2 d-flex">
      <v-avatar color="primary" rounded size="60"
        ><v-icon dark> mdi-account-circle </v-icon></v-avatar
      >
      <div class="ml-2 d-flex flex-column">
        <strong>{{ user.name }} {{ user.surname }}</strong>
        <span class="text-caption">{{ user.company?.company }}</span>
      </div>
    </v-card>
    <!--  Plan Admin -->
    <!-- Dialog confirm -->
    <v-dialog v-model="changeTariffDialogConfirm" persistent max-width="500">
      <v-card>
        <v-card-title class="text-h6">
          Ви дійсно хочете змінити тарифний план на <strong>{{ enumPlan[chosenPlan?.plan] }}</strong
          >?</v-card-title
        >
        <v-card-text>
          <p v-if="chosenPlan?.plan === 0">Якщо змінити тарифний план, оплата не повертається.</p>
          <p v-else>Якщо змінити тарифний план, оплата буде стягнута в повному обсязі. Змінити?</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="changeTariffDialogConfirm = false">
            {{ $t('buttons.cancel') }}
          </v-btn>
          <v-btn color="success darken-1" text @click="changeAdminTariff()">
            {{ $t('buttons.change') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="plans d-flex my-12">
      <plan-card
        v-for="(plan, index) in plans"
        :key="index"
        :current-plan="plan"
        :chosen-plan="user.company?.plan.plan"
        :company-id="user.company_id"
        :company-name="user.company?.company"
        :payment-status="user.company?.payment_status"
        @change-tariff="changeTariffConfirmation"
      ></plan-card>
    </div>
    <!--  Edit Admin -->
    <v-card class="mt-4" max-width="900px">
      <v-card-title>{{ $t('general.detail.title') }}</v-card-title>
      <v-card-text>
        <form @submit.prevent>
          <v-row>
            <v-col xl="12">
              <div>
                <v-text-field
                  v-model="name"
                  :error-messages="nameErrors"
                  :label="$t('formFields.name')"
                  :disabled="disabled"
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model="surname"
                  :error-messages="surnameErrors"
                  :label="$t('formFields.surname')"
                  :disabled="disabled"
                  @input="$v.surname.$touch()"
                  @blur="$v.surname.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  :error-messages="emailErrors"
                  :label="$t('formFields.email')"
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                  :disabled="disabled"
                ></v-text-field>
                <v-text-field
                  v-if="company"
                  :label="$t('formFields.companyName')"
                  :disabled="true"
                  :value="company.company"
                ></v-text-field>
                <v-text-field
                  v-if="role"
                  :label="roleLabel"
                  :disabled="true"
                  :value="role.description"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="8">
              <v-btn
                small
                class="mr-3"
                color="success"
                type="submit"
                v-if="disabled"
                @click.prevent="disabled = !disabled"
              >
                <v-icon class="d-sm-none d-md-none d-lg-none" dark> mdi-pencil </v-icon>
                <span class="d-none d-sm-flex">{{ $t('buttons.edit') }}</span>
              </v-btn>
              <div v-else class="flex-in-one-line">
                <v-btn
                  small
                  class="mr-3"
                  color="primary"
                  type="submit"
                  :disabled="$v.$invalid || disabled || loading"
                  @click.prevent="updateUser"
                >
                  <v-icon class="d-sm-none d-md-none d-lg-none" dark>
                    mdi-content-save-outline
                  </v-icon>
                  <span class="d-none d-sm-flex">{{ $t('buttons.save') }}</span>
                </v-btn>

                <v-btn
                  small
                  class="mr-3 white--text"
                  color="blue-grey"
                  type="submit"
                  @click.prevent="disabled = !disabled"
                >
                  <v-icon class="d-sm-none d-md-none d-lg-none" dark>
                    mdi-close-circle-outline
                  </v-icon>
                  <span class="d-none d-sm-flex">{{ $t('buttons.cancel') }}</span>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </form>
      </v-card-text>
    </v-card>
    <!-- Dialog confirm -->
    <v-dialog v-model="deleteDialogConfirm" persistent max-width="500">
      <v-card>
        <v-card-title class="text-h6" v-if="company">
          {{ $t('dialog.heading.delete.admin') }} {{ company.company }} ?
        </v-card-title>
        <v-card-text>
          <strong>{{ $t('dialog.warning.title') }}</strong
          >: {{ $t('dialog.warning.description') }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="deleteDialogConfirm = false">
            {{ $t('buttons.cancel') }}
          </v-btn>
          <v-btn color="error darken-1" text @click="deleteAdministrator">
            {{ $t('buttons.approve') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  Delete Admin -->
    <v-card class="mt-2" max-width="900px">
      <v-card-title class="text-h5">
        {{ $t('admin.cards.delete.heading') }}
      </v-card-title>
      <v-card-subtitle>{{ $t('admin.cards.delete.subtitle') }}</v-card-subtitle>
      <v-card-actions class="mx-4 d-flex justify-space-between">
        <div>
          <v-switch
            v-model="confirmDelete"
            inset
            :label="$t('admin.cards.delete.checkbox')"
          ></v-switch>
        </div>
        <div class="text-right">
          <v-btn
            small
            color="error"
            type="submit"
            :disabled="!confirmDelete || loading"
            @click.prevent="deleteDialogConfirm = !deleteDialogConfirm"
          >
            <v-icon class="d-sm-none d-md-none d-lg-none" dark> mdi-delete </v-icon>
            <span class="d-none d-sm-flex">{{ $t('buttons.delete') }}</span>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { AuthService } from '@/services/auth.service';
import { UsersService } from '@/services/users.service';
import { PlansService } from '@/services/plans.service';
import { PaymentService } from '@/services/payment.service';
import { CompanyService } from '@/services/company.service';
import { email, required } from 'vuelidate/lib/validators';
import { nameSurnameValidate } from '@/mixins/validators';
import { Plan } from '@/common/constants/plan.enum-like';

export default {
  name: 'AdminProfile',
  components: {
    PlanCard: () => import('@/components/PlanCard'),
  },
  data: () => ({
    userId: '',
    user: '',
    name: '',
    surname: '',
    email: '',
    modal: false,
    disabled: true,
    loading: false,
    deleteDialogConfirm: false,
    role: null,
    planInfo: null,
    company: null,
    confirmDelete: false,
    enumPlan: Plan,
    plans: [],
    form: null,
    changeTariffDialogConfirm: false,
    chosenPlan: null,
  }),
  validations: {
    name: { required, nameSurnameValidate },
    surname: { required, nameSurnameValidate },
    email: { required, email },
  },
  created() {
    // Start method getting domain data by id
    this.userId = this.$route.params?.id;
    this.getUserData(this.userId);
    this.loadPlans();
  },
  computed: {
    roleLabel() {
      return this.role ? `${this.$t('formFields.role')}: ${this.role.value}` : '';
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push(this.$t('validationErrors.name.required'));
      !this.$v.name.nameSurnameValidate && errors.push(this.$t('validationErrors.name.invalid'));
      return errors;
    },
    surnameErrors() {
      const errors = [];
      if (!this.$v.surname.$dirty) return errors;
      !this.$v.surname.required && errors.push(this.$t('validationErrors.surname.required'));
      !this.$v.surname.nameSurnameValidate &&
        errors.push(this.$t('validationErrors.surname.invalid'));
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push(this.$t('validationErrors.email.required'));
      !this.$v.email.email && errors.push(this.$t('validationErrors.email.invalid'));
      return errors;
    },
  },
  methods: {
    truncPrice(price) {
      return parseFloat(price) / 100;
    },
    async loadPlans() {
      this.beforeLoading();
      await PlansService.getAllPlansForNonLogin()
        .then((response) => {
          const sortedPlans = response.data;
          this.plans = sortedPlans.sort((a, b) => a.price - b.price);
        })
        .catch((error) => console.log(error));
      this.afterLoading();
    },
    async getUserData(id) {
      if (!id) return;
      this.loading = true;
      await UsersService.findAdminUser(id)
        .then((response) => {
          this.user = response.data;
          this.setDataUser(response.data);
        })
        .catch((error) => {
          this.$toast.error(error.message);
          AuthService.logout();
        });
      this.loading = false;
    },
    setDataUser(user) {
      this.name = user.name;
      this.surname = user.surname;
      this.email = user.email;
      this.role = user.roles[0];
      this.company = user?.company;
      this.planInfo = user?.company.plan;
    },
    async updateUser() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.beforeLoading();
      const preparedData = {
        name: this.name,
        surname: this.surname,
        email: this.email,
      };
      await UsersService.updateUser(this.userId, preparedData)
        .then(() => {
          this.$toast.success(this.$t('success.user.update'));
          this.getUserData(this.userId);
        })
        .catch((error) => {
          this.$toast.error(`${this.$t('error.general.oops')} ${error.message}`);
        });
      this.afterLoading();
    },
    async deleteAdministrator() {
      this.deleteDialogConfirm = false;
      this.beforeLoading();
      await UsersService.deleteAdminAndCompany(this.userId)
        .then(() => {
          AuthService.logout();
        })
        .catch((error) => {
          this.$toast.error(`${this.$t('error.general.oops')} ${error.message}`);
        });
      this.afterLoading();
    },
    beforeLoading() {
      this.loading = true;
      this.disabled = true;
    },
    afterLoading() {
      this.loading = false;
    },
    changeTariffConfirmation(chosenPlan) {
      this.chosenPlan = chosenPlan;
      this.changeTariffDialogConfirm = !this.changeTariffDialogConfirm;
    },
    async changeAdminTariff() {
      this.changeTariffDialogConfirm = false;
      this.beforeLoading();
      await CompanyService.changeTariffPlan(this.chosenPlan.id, this.chosenPlan.plan)
        .then(() => {
          this.getUserData(this.userId);
          this.loadPlans();
          this.$toast.success(this.$t('success.user.changeTariff'));
        })
        .catch((error) => {
          this.$toast.error(`${this.$t('error.general.oops')} ${error.message}`);
        });
      this.afterLoading();
    },
    async makePayment() {
      const dataForPayment = {
        company_id: this.user.company_id,
        plan: this.planInfo.plan,
        userName: `${this.user.name} ${this.user.surname}`,
        amount: this.planInfo.price.replace(/\./g, ''),
        currency: this.planInfo.currency_code,
      };

      await PaymentService.createPaymentFondy(dataForPayment)
        .then((response) => {
          if (response.data.response_status === 'success' && response.data.checkout_url) {
            window.location.href =
              response.data.checkout_url || this.$router.push(`/profile/${this.userId}`);
          }
          console.log(response.data);
        })
        .catch((error) => {
          this.$toast.error(`${this.$t('error.general.oops')} ${error.message}`);
        });
    },
  },
};
</script>

<style scoped></style>
