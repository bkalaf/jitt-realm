import * as React from 'react';
import { useDataList } from './useDataList';

const $provinces = 'datalist-provinces';
const $countries = 'datalist-countries';
export function useProvideDataLists() {
    const provinces = useDataList(
        $provinces,
        <>
            <option value='' label='' />
            <optgroup label='States'>
                <option value='AK' label='Alaska' />
                <option value='AL' label='Alabama' />
                <option value='AR' label='Arkansas' />
                <option value='AZ' label='Arizona' />
                <option value='CA' label='California' />
                <option value='CO' label='Colorado' />
                <option value='CT' label='Connecticut' />
                <option value='DE' label='Deleware' />
                <option value='GA' label='Georgia' />
                <option value='FL' label='Flordia' />
                <option value='HI' label='Hawaii' />
                <option value='ID' label='Idaho' />
                <option value='IA' label='Iowa' />
                <option value='IN' label='Indiana' />
                <option value='IL' label='Illinois' />
                <option value='KS' label='Kansas' />
                <option value='KY' label='Kentucky' />
                <option value='LA' label='Louisiana' />
                <option value='MD' label='Maryland' />
                <option value='ME' label='Maine' />
                <option value='MA' label='Massachusettes' />
                <option value='MI' label='Michigan' />
                <option value='MN' label='Minnesota' />
                <option value='MS' label='Mississippi' />
                <option value='MO' label='Missouri' />
                <option value='MT' label='Montana' />
                <option value='NE' label='Nebraska' />
                <option value='NV' label='Nevada' />
                <option value='NH' label='New Hampshire' />
                <option value='NJ' label='New Jersey' />
                <option value='NM' label='New Mexico' />
                <option value='NY' label='New York' />
                <option value='NC' label='North Carolina' />
                <option value='ND' label='North Dakota' />
                <option value='OH' label='Ohio' />
                <option value='OK' label='Oklahoma' />
                <option value='OR' label='Oregon' />
                <option value='PA' label='Pennsylvania' />
                <option value='PR' label='Puerto Rico' />
                <option value='RI' label='Rhode Island' />
                <option value='SC' label='South Carolina' />
                <option value='SD' label='South Dakota' />
                <option value='TN' label='Tennessee' />
                <option value='TX' label='Texas' />
                <option value='UT' label='Utah' />
                <option value='VA' label='Virginia' />
                <option value='VI' label='Virgin Islands' />
                <option value='VT' label='Vermont' />
                <option value='WA' label='Washington' />
                <option value='WI' label='Wisconsin' />
                <option value='WV' label='West Virginia' />
                <option value='WY' label='Wyoming' />
            </optgroup>
            <optgroup label='Provinces'>
                <option value='AB' label='Alberta' />
                <option value='BC' label='British Columbia' />
                <option value='MB' label='Manitoba' />
                <option value='NB' label='New Brunswick' />
                <option value='NL' label='Newfoundland and Labrador' />
                <option value='NT' label='Northwest Territories' />
                <option value='NS' label='Nova Scotia' />
                <option value='ON' label='Ontario' />
                <option value='PE' label='Prince Edward Island' />
                <option value='QC' label='Quebec' />
                <option value='SK' label='Saskatchewan' />
                <option value='YT' label='Yukon' />
            </optgroup>
        </>
    );
    const countries = useDataList(
        $countries,
        <>
            <option value='' label='' />
            <option label='Argentina' value='AR' />
            <option label='Australia' value='AU' />
            <option label='Austria' value='AT' />
            <option label='Bangladesh' value='BD' />
            <option label='Belgium' value='BE' />
            <option label='Belize' value='BZ' />
            <option label='Bermuda' value='BM' />
            <option label='Brazil' value='BR' />
            <option label='Bulgaria' value='BG' />
            <option label='Cambodia' value='KH' />
            <option label='Cameroon' value='CM' />
            <option label='Canada' value='CA' />
            <option label='Chile' value='CL' />
            <option label='China' value='CN' />
            <option label='Columbia' value='CO' />
            <option label='Costa Rica' value='CR' />
            <option label='Cuba' value='CU' />
            <option label='Denmark' value='DK' />
            <option label='Dominica' value='DM' />
            <option label='Dominican Republic' value='DO' />
            <option label='Ecuador' value='EC' />
            <option label='Egypt' value='EG' />
            <option label='El Salvador' value='SV' />
            <option label='Eritrea' value='ER' />
            <option label='Estonia' value='EE' />
            <option label='Ethopia' value='ET' />
            <option label='Fiji' value='FJ' />
            <option label='Finland' value='FI' />
            <option label='France' value='FR' />
            <option label='French Polynesia' value='PF' />
            <option label='Georgia' value='GE' />
            <option label='Germany' value='DE' />
            <option label='Greece' value='GR' />
            <option label='Grenada' value='GD' />
            <option label='Guam' value='GU' />
            <option label='Guatamala' value='GT' />
            <option label='Haiti' value='HT' />
            <option label='Holy See' value='VA' />
            <option label='Honduras' value='HN' />
            <option label='Hong Kong' value='HK' />
            <option label='Hungary' value='HU' />
            <option label='Iceland' value='IS' />
            <option label='India' value='IN' />
            <option label='Indonesia' value='ID' />
            <option label='Iran' value='IR' />
            <option label='Iraq' value='IQ' />
            <option label='Ireland' value='IE' />
            <option label='Israel' value='IL' />
            <option label='Italy' value='IT' />
            <option label='Jamaica' value='JM' />
            <option label='Japan' value='JP' />
            <option label='Jordan' value='JO' />
            <option label='Kazakhstan' value='KZ' />
            <option label='Kenya' value='KE' />
            <option label='Kuwait' value='KW' />
            <option label='Kyrgyzstan' value='KG' />
            <option label='Laos' value='LA' />
            <option label='Latvia' value='LV' />
            <option label='Lebanon' value='LB' />
            <option label='Lesotho' value='LS' />
            <option label='Liberia' value='LR' />
            <option label='Libya' value='LY' />
            <option label='Liechtenstein' value='LI' />
            <option label='Lithuania' value='LT' />
            <option label='Luxenbourg' value='LU' />
            <option label='Macao' value='MO' />
            <option label='Madagascar' value='MG' />
            <option label='Malawi' value='MW' />
            <option label='Malaysia' value='MY' />
            <option label='Malta' value='MT' />
            <option label='Martinique' value='MQ' />
            <option label='Mexico' value='MX' />
            <option label='Micronesia' value='FM' />
            <option label='Monaco' value='MC' />
            <option label='Mongolia' value='MN' />
            <option label='Montenegro' value='ME' />
            <option label='Montserrat' value='MS' />
            <option label='Morocco' value='MA' />
            <option label='Myanmar' value='MM' />
            <option label='Nepal' value='NP' />
            <option label='Netherlands' value='NL' />
            <option label='New Zealand' value='NZ' />
            <option label='Nicaragua' value='NI' />
            <option label='Nigeria' value='NG' />
            <option label='North Korea' value='KP' />
            <option label='North Macedonia' value='MK' />
            <option label='Norway' value='NO' />
            <option label='Oman' value='OM' />
            <option label='Pakistan' value='PK' />
            <option label='Palestine' value='PS' />
            <option label='Panama' value='PA' />
            <option label='Paraguay' value='PY' />
            <option label='Peru' value='PE' />
            <option label='Phillipines' value='PH' />
            <option label='Poland' value='PL' />
            <option label='Portugal' value='PT' />
            <option label='Qatar' value='QA' />
            <option label='Romania' value='RO' />
            <option label='Russian Federation' value='RU' />
            <option label='Rwanda' value='RW' />
            <option label='Samoa' value='WS' />
            <option label='San Marino' value='SM' />
            <option label='Saudi Arabia' value='SA' />
            <option label='Senegal' value='SN' />
            <option label='Serbia' value='RS' />
            <option label='Seychelles' value='SC' />
            <option label='Singapore' value='SG' />
            <option label='Slovakia' value='SK' />
            <option label='Slovenia' value='SI' />
            <option label='Solomon Islands' value='SB' />
            <option label='Somalia' value='SO' />
            <option label='South Africa' value='ZA' />
            <option label='South Korea' value='KR' />
            <option label='South Sudan' value='SS' />
            <option label='Spain' value='ES' />
            <option label='Sri Lanka' value='LK' />
            <option label='Sudan' value='SD' />
            <option label='Suriname' value='SR' />
            <option label='Sweden' value='SE' />
            <option label='Switzerland' value='CH' />
            <option label='Syria' value='SY' />
            <option label='Taiwan' value='TW' />
            <option label='Tajikistan' value='TJ' />
            <option label='Tanzania' value='TZ' />
            <option label='Thailand' value='TH' />
            <option label='Togo' value='TG' />
            <option label='Tonga' value='TO' />
            <option label='Trinidad and Tobago' value='TT' />
            <option label='Tunisia' value='TN' />
            <option label='Turkey' value='TR' />
            <option label='Turkmenistan' value='TM' />
            <option label='Turks and Caicos' value='TC' />
            <option label='Tuvalu' value='TV' />
            <option label='Uganda' value='UG' />
            <option label='Ukraine' value='UA' />
            <option label='United Arab Emirates' value='AE' />
            <option label='United Kingdom' value='GB' />
            <option label='United States' value='US' />
            <option label='Uruguay' value='UY' />
            <option label='Uzbekistan' value='UZ' />
            <option label='Vanuatu' value='VU' />
            <option label='Venezuela' value='VE' />
            <option label='Vietnam' value='VN' />
            <option label='Virgin Islands, British' value='VG' />
            <option label='Virgin Islands, US' value='VI' />
            <option label='Western Sahara' value='EH' />
            <option label='Yemen' value='YE' />
            <option label='Zambia' value='ZM' />
            <option label='Zimbabwe' value='ZW' />
        </>
    );
    return React.useMemo(
        () => ({
            [$countries]: countries,
            [$provinces]: provinces
        }),
        [countries, provinces]
    );
}
