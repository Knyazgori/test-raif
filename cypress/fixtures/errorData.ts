const errorData = {
    "why_choose": [
        {value: "", error: true},
        {value: " ", error: true},
        {value: "a".repeat(501), error: true},
    ],
    "phone": [
        //+7 подставляется маской
        {value: "phone", error: true},
        {value: "1112223344", error: true},
        {value: " (911) 222-33-44#161879", error: false}
    ],
    "address": [
        {value: '', error: true},
        {value: ' ', error: true},
        {value: 'СПб, Заячий остров, д. 1', error: true},
        {value: "a".repeat(256), error: true},
    ],
    "is_main_bank": [
        {value: true, error: false},
        {value: false, error: false},
    ],
    "main_bank_why": [
        {value: "", error: true},
        {value: " ", error: true},
        {value: "a".repeat(501), error: true},
    ],
    "is_investment": [
        {value: true, error: false},
        {value: false, error: false},
    ],
    "investment_prefer": [
        {value: "", error: true},
        {value: " ", error: true},
        {value: "a".repeat(501), error: true},
    ],
    "is_investment_plan": [
        {value: true, error: false},
        {value: false, error: false},
    ],
}

export default errorData