<?php

namespace App\Enums;

enum VacancyType : string
{
    case CLT = "clt";
    case PESSOA_JURIDICA = "pessoa_juridica";
    case FREELANCER = "freelancer";
}