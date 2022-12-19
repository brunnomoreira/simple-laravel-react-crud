<?php

namespace App\Enums;

enum VacancyType : string
{
    case CLT = "clt";
    case PESSOA_JURIDICA = "pessoa_juridica";
    case FREELANCER = "freelancer";

    public function description(): string
    {
        return match($this) 
        {
            VacancyType::CLT => 'CLT',   
            VacancyType::PESSOA_JURIDICA => 'Pessoa Jurídica',   
            VacancyType::FREELANCER => 'Freelancer',   
        };
    }
}