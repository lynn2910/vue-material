<template>
  <div class="m-10">
    <div
      class="flex flex-col gap-10 p-7 bg-surface rounded-lg border border-surface-container-highest w-full">

      <div class="flex flex-row gap-10 items-stretch">
        <!-- Sliders -->
        <div class="flex flex-col items-start gap-6">
          <h3 class="text-title-medium text-on-surface">Sliders</h3>

          <div
            class="border border-on-surface-variant/20 p-10 flex flex-row items-start rounded-xl gap-5 text-on-surface-variant">

            <!-- Horizontal -->
            <div class="flex flex-col gap-5 w-64">
              <BaseSlider v-model="horizontalSlider1" :min="0" :max="10"/>
              <BaseSlider v-model="horizontalSliderStepped" :min="0" :max="10" :step="1" showSteps/>
              <RangeSlider v-model="horizontalRange" :min="0" :max="10"/>
            </div>

            <Divider vertical/>

            <div class="flex flex-col gap-3.5 w-64">
              <p class="m-0">{{ horizontalSlider1 }}</p>
              <p class="m-0">{{ horizontalSliderStepped }}</p>
              <p class="m-0">{{ horizontalRange[0] }} - {{ horizontalRange[1] }}</p>
            </div>

          </div>
        </div>

        <!-- Checkbox -->
        <div class="flex flex-col items-start gap-6">
          <h3 class="text-title-medium text-on-surface">Checkbox</h3>

          <div
            class="border border-on-surface-variant/20 p-9 flex flex-col items-start rounded-xl gap-2 text-on-surface-variant">

            <p>Standard</p>
            <div class="flex flex-row items-center justify-start gap-5">
              <Checkbox name="checkbox_1" v-model="checkbox1"/>
              <Checkbox name="checkbox_2" v-model="checkbox2"/>
              <Checkbox name="checkbox_3" v-model="checkbox3"/>
              <Checkbox name="checkbox_3" v-model="checkboxDisabled" disabled/>
              <Checkbox name="checkbox_3" v-model="checkbox2Disabled" disabled/>
            </div>

            <p>Erreur</p>
            <div class="flex flex-row items-center justify-start gap-5">
              <Checkbox name="checkbox_1" v-model="checkbox1" is_error/>
              <Checkbox name="checkbox_2" v-model="checkbox2" is_error/>
              <Checkbox name="checkbox_3" v-model="checkbox3" is_error/>
              <Checkbox name="checkbox_3" v-model="checkboxDisabled" is_error disabled/>
              <Checkbox name="checkbox_3" v-model="checkbox2Disabled" is_error disabled/>
            </div>

          </div>
        </div>

        <!-- Radio -->
        <div class="flex flex-col items-start gap-6">
          <h3 class="text-title-medium text-on-surface">Radio</h3>

          <div
            class="border border-on-surface-variant/20 p-9 flex flex-col items-start rounded-xl gap-2 text-on-surface-variant h-full">

            <Radio name="radio" label="Valeur 1" :value="1" v-model="radioTest"/>
            <Radio name="radio" label="Valeur 2" :value="2" v-model="radioTest"/>
            <Radio name="radio" label="Valeur 3 (désactivée)" :value="4" v-model="radioTest"
                   disabled/>
          </div>
        </div>

        <!-- Switch -->
        <div class="flex flex-col items-start gap-6">
          <h3 class="text-title-medium text-on-surface">Switch</h3>

          <div
            class="border border-on-surface-variant/20 p-9 flex flex-row items-start rounded-xl gap-2 text-on-surface-variant h-full">

            <div class="flex flex-col gap-2">
              <Switch name="switch_1" v-model="switch1"/>
              <Switch name="switch_1" v-model="switch1" show_icon/>
            </div>

            <div class="flex flex-col gap-2">
              <Switch name="switch_1" v-model="switch2"/>
              <Switch name="switch_1" v-model="switch2" show_icon/>
            </div>
            <div class="flex flex-col gap-2">
              <Switch name="switch_disabled" v-model="switchDisabled" disabled/>
              <Switch name="switch_disabled" v-model="switchDisabled" disabled show_icon/>
            </div>

          </div>
        </div>
      </div>

      <div class="flex flex-row gap-10 items-stretch">
        <!-- TextFields -->
        <div class="flex flex-col items-start gap-6">
          <h3 class="text-title-medium text-on-surface">Champs de textes (TextField)</h3>

          <div
            class="border border-on-surface-variant/20 p-10 flex flex-row items-start rounded-xl gap-5 text-on-surface-variant">

            <div class="flex flex-col gap-3.5 w-80">
              <p class="text-title-medium">Input outlined</p>

              <TextField type="text"
                         v-model="input1"
                         id="outlined_user_login"
                         label="Identifiant"
                         name="outlined_login"
                         support_text="L'identifiant qui vous as été transmis par mail"/>

              <TextField type="text"
                         v-model="input2"
                         id="outlined_user_password"
                         name="outlined_last_name"
                         label="Last name"/>

              <TextField label="Disabled" type="text" disabled
                         v-model="input3"
                         name="outlined_disabled"
                         id="outlined_disabled_textfield"/>

              <TextField label="Search"
                         v-model="input4"
                         icon="search"
                         name="outlined_search"
                         id="outlined_search_field"
                         type="text"/>

              <TextField type="text"
                         v-model="input5"
                         label="Email"
                         name="outlined_email"
                         :pattern="emailValidationRegex"
                         id="outlined_email_field"
                         icon="alternate_email"/>
            </div>

            <Divider vertical/>

            <!-- Filled -->
            <div class="flex flex-col gap-3.5 w-80">
              <p class="text-title-medium">Input Filled</p>

              <TextField type="text"
                         v-model="input6"
                         filled
                         id="filled_user_login"
                         name="filled_login"
                         label="Identifiant"
                         support_text="L'identifiant qui vous as été transmis par mail"/>

              <TextField type="text"
                         v-model="input7"
                         filled
                         id="filled_user_password"
                         name="filled_last_name"
                         label="Last name"/>

              <TextField label="Disabled" type="text" disabled filled
                         v-model="input8"
                         name="filled_disabled"
                         id="filled_disabled_textfield"/>

              <TextField label="Search"
                         v-model="input9"
                         icon="search"
                         id="filled_search_field"
                         name="filled_search"
                         filled
                         type="text"/>

              <TextField type="text"
                         v-model="input10"
                         label="Email"
                         id="filled_email_field"
                         filled
                         :pattern="emailValidationRegex"
                         name="filled_email"
                         icon="alternate_email"/>
            </div>

          </div>
        </div>
      </div>


      <div class="flex flex-col gap-10 items-stretch">
        <h3 class="text-title-medium text-on-surface">Menu</h3>

        <div
          class="border border-on-surface-variant/20 p-10 flex flex-row items-start rounded-xl gap-5 text-on-surface-variant">

          <ElevatedSplitButton label="Show menu" :opened="showMenu1"
                               ref="menuBtn1"
                               @click="showMenu1 = !showMenu1"/>

          <Menu :anchor="menuBtn1" :show-menu="showMenu1" :items="menu"
                @close="showMenu1 = false"/>

          <FilledSplitButton label="Show menu" :opened="showMenu2"
                             ref="menuBtn2"
                             @click="showMenu2 = !showMenu2"/>

          <Menu :anchor="menuBtn2" :show-menu="showMenu2" :items="menu"
                @close="showMenu2 = false"/>

          <OutlinedSplitButton label="Show menu" :opened="showMenu3"
                               ref="menuBtn3"
                               @click="showMenu3 = !showMenu3"/>

          <Menu :anchor="menuBtn3" :show-menu="showMenu3" :items="menu"
                @close="showMenu3 = false"/>

          <TonalSplitButton label="Show menu" :opened="showMenu4"
                            ref="menuBtn4"
                            @click="showMenu4 = !showMenu4"/>

          <Menu :anchor="menuBtn4" :show-menu="showMenu4" :items="menu"
                @close="showMenu4 = false"/>


        </div>
      </div>


      <div class="flex flex-col gap-10 items-stretch">
        <h3 class="text-title-medium text-on-surface">Selects</h3>

        <div
          class="border border-on-surface-variant/20 p-10 flex flex-col items-start rounded-xl gap-5 text-on-surface-variant w-1/3">

          <div class="flex flex-row gap-5 w-full">
            <SingleSelect :items="selectItems"
                          :selected="select1"
                          @change="onSelect1Change"
                          placeholder="No item selected"/>


            <SingleSelect :items="selectItems"
                          :selected="select2"
                          @change="onSelect2Change"
                          disallow-null/>
          </div>

          <div class="flex flex-col gap-5 w-full">
            <MultipleSelect :items="selectItems"
                            :selected="select3"
                            @change="onSelect3Change"
                            placeholder="No item selected"/>

            <MultipleSelect :items="selectItems"
                            :selected="select4"
                            @change="onSelect4Change"
                            :max-selection="2"
                            show-select-all
                            placeholder="No item selected"/>
          </div>

        </div>
      </div>

      <div class="flex flex-row gap-10 items-start w-full">
        <!-- Chips -->
        <div class="flex flex-col items-start gap-6">
          <h3 class="text-title-medium text-on-surface">Puces (Chips)</h3>

          <p>Par défaut, les puces ont le style "outlined". Ajouter la propriété 'filled' (booléen)
            dans le composant permet d'activer le remplissage de la puce.</p>

          <div
            class="border border-on-surface-variant/20 p-9 flex flex-col items-start rounded-xl gap-10 text-on-surface-variant h-full w-full">

            <div class="flex flex-col gap-5 w-full">
              <h4 class="text-title-medium text-on-surface">Puces d'assistances (AssistChip)</h4>

              <p class="text-justify w-1/2">Les <b>Assist chips</b> représentent des actions
                intelligentes ou automatisées qui
                peuvent s'étendre sur plusieurs applications. Elles fonctionnent comme si
                l'utilisateur avait demandé à un assistant de compléter une action.</p>

              <div class="flex flex-row gap-5">
                <AssistChip label="Assist chip" icon="local_taxi"/>
                <AssistChip label="Assist chip" icon="local_taxi" filled/>
                <AssistChip label="Assist chip" icon="local_taxi" disabled/>
                <AssistChip label="Assist chip" icon="local_taxi" filled disabled/>
              </div>
            </div>

            <div class="flex flex-col gap-5 w-full">
              <h4 class="text-title-medium text-on-surface">Puces de filtre (FilterChip)</h4>

              <p class="text-justify w-1/2">Les <b>Filter chips</b> permettent aux utilisateurs de
                filtrer le contenu en utilisant des balises ou des mots descriptifs. Elles offrent
                un moyen de sélectionner ou de désélectionner des options pour affiner les
                informations affichées.</p>

              <div class="flex flex-row gap-5 items-center flex-wrap">
                <FilterChip label="Filter chip"/>
                <FilterChip label="Filter chip" disabled/>
                <FilterChip label="Filter chip" checked/>
                <FilterChip label="Filter chip" filled disabled/>

                <FilterChip label="Filter chip" checked filled/>
                <FilterChip label="Filter chip" checked disabled/>
                <FilterChip label="Filter chip" checked filled disabled/>
              </div>
              <div class="flex flex-row gap-5 items-center flex-wrap">
                <FilterChip label="Filter chip" show_trailing/>
                <FilterChip label="Filter chip" disabled show_trailing/>
                <FilterChip label="Filter chip" checked show_trailing/>
                <FilterChip label="Filter chip" filled disabled show_trailing/>
              </div>
            </div>

            <div class="flex flex-col gap-5 w-full">
              <h4 class="text-title-medium text-on-surface">Puces d'entrées (InputChip)</h4>

              <p class="text-justify w-1/2">Les <b>Input chips</b> représentent des informations
                discrètes saisies par l'utilisateur. Elles permettent de visualiser et de gérer des
                éléments complexes comme des entités (personnes, lieux, choses) ou du texte. Elles
                peuvent être rendues sélectionnables, supprimables ou cliquables.</p>

              <div class="flex flex-row gap-5">
                <InputChip label="Input chip" icon="broken_image"/>
                <InputChip label="Input chip" icon="broken_image" filled/>
                <InputChip label="Input chip" icon="broken_image" disabled/>
                <InputChip label="Input chip" icon="broken_image" filled disabled/>
              </div>

              <div class="flex flex-row gap-5">
                <InputChip label="Input chip" icon="broken_image" allow_delete/>
                <InputChip label="Input chip" icon="broken_image" filled allow_delete/>
                <InputChip label="Input chip" icon="broken_image" disabled allow_delete/>
                <InputChip label="Input chip" icon="broken_image" filled disabled allow_delete/>
              </div>
            </div>

            <div class="flex flex-col gap-5 w-full">
              <h4 class="text-title-medium text-on-surface">Puces de suggestion
                (SuggestionChip)</h4>

              <p class="text-justify w-1/2">Les <b>Suggestion chips</b> aident à affiner l'intention
                de l'utilisateur en présentant des suggestions générées dynamiquement. Elles sont
                souvent utilisées pour anticiper le besoin de l'utilisateur ou pour proposer des
                réponses rapides.</p>

              <div class="flex flex-row gap-5">
                <SuggestionChip label="Assist chip"/>
                <SuggestionChip label="Assist chip" filled/>
                <SuggestionChip label="Assist chip" disabled/>
                <SuggestionChip label="Assist chip" filled disabled/>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSlider from "@/components/material/inputs/sliders/BaseSlider.vue";
import Divider from "@/components/material/containment/dividers/Divider.vue";
import {ref} from "vue";
import RangeSlider from "@/components/material/inputs/sliders/RangeSlider.vue";
import Checkbox from "@/components/material/inputs/Checkbox.vue";
import Radio from "@/components/material/inputs/Radio.vue";
import Switch from "@/components/material/inputs/Switch.vue";
import AssistChip from "@/components/material/inputs/chips/AssistChip.vue";
import FilterChip from "@/components/material/inputs/chips/FilterChip.vue";
import InputChip from "@/components/material/inputs/chips/InputChip.vue";
import SuggestionChip from "@/components/material/inputs/chips/SuggestionChip.vue";
import TextField from "@/components/material/inputs/TextField.vue";
import FilledButton from "@/components/material/buttons/withLabels/FilledButton.vue";
import ElevatedSplitButton
  from "@/components/material/buttons/splitButtons/ElevatedSplitButton.vue";
import FilledSplitButton from "@/components/material/buttons/splitButtons/FilledSplitButton.vue";
import OutlinedSplitButton
  from "@/components/material/buttons/splitButtons/OutlinedSplitButton.vue";
import TonalSplitButton from "@/components/material/buttons/splitButtons/TonalSplitButton.vue";
import Menu, {type MenuItems} from "@/components/material/inputs/Menu.vue";
import SingleSelect from "@/components/material/inputs/selects/SingleSelect.vue";
import MultipleSelect from "@/components/material/inputs/selects/MultipleSelect.vue";

const horizontalSlider1 = ref(4);
const horizontalSliderStepped = ref(3);
const horizontalRange = ref([2, 6]);

const checkbox1 = ref(0);
const checkbox2 = ref(1);
const checkbox3 = ref(-1);
const checkboxDisabled = ref(0);
const checkbox2Disabled = ref(1);

const radioTest = ref(2);

const switch1 = ref(false);
const switch2 = ref(true);
const switchDisabled = ref(true);

const input1 = ref("");
const input2 = ref("");
const input3 = ref("");
const input4 = ref("");
const input5 = ref("");
const input6 = ref("");
const input7 = ref("");
const input8 = ref("");
const input9 = ref("");
const input10 = ref("");

const emailValidationRegex = "^((?!\\.)[\\w-_.]*[^.])(@\\w+)(\\.\\w+(\\.\\w+)?[^.\\W])$";


const menuBtn1 = ref(null);
const showMenu1 = ref(false);
const menuBtn2 = ref(null);
const showMenu2 = ref(false);
const menuBtn3 = ref(null);
const showMenu3 = ref(false);
const menuBtn4 = ref(null);
const showMenu4 = ref(false);

const menu: MenuItems = [
  {
    leading_icon: 'person',
    label: "Profil",

    trailing_text: "⌘P",
  },
  {
    leading_icon: 'settings',
    label: "Paramètres",
    trailing_icon: "exclamation"
  },
  {
    leading_icon: 'help_center',
    label: "Aide",
  },
  "divider",
  {
    leading_icon: 'logout',
    label: "Déconnecter",
  },
]

const select1 = ref(0);
const select2 = ref(0);
const select3 = ref([0]);
const select4 = ref([0]);
const selectItems = [
  {
    value: 0,
    label: "Option 1"
  },
  {
    value: 1,
    label: "Option 2"
  },
  {
    value: 2,
    label: "Option 3"
  }
]

function onSelect1Change(value: any) {
  select1.value = value;
}

function onSelect2Change(value: any) {
  select2.value = value;
}

function onSelect3Change(value: any[]) {
  select3.value = value;
}

function onSelect4Change(value: any[]) {
  select4.value = value;
}
</script>
