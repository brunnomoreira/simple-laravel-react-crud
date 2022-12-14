<?php

namespace App\Enums;

enum VacancyStatus : string
{
    case OPEN = "open";
    case CLOSED = "closed";
    case PAUSED = "paused";
}