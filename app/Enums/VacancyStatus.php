<?php

namespace App\Enums;

enum VacancyStatus : string
{
    case OPEN = "open";
    case CLOSED = "closed";
    case PAUSED = "paused";

    public function description(): string
    {
        return match($this) 
        {
            VacancyStatus::OPEN => 'Aberta',   
            VacancyStatus::CLOSED => 'Encerrada',   
            VacancyStatus::PAUSED => 'Pausada',   
        };
    }
}