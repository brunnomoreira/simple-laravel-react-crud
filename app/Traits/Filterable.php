<?php

namespace App\Traits;

trait Filterable
{
    /**
     * return array searchable fields
     */
    abstract public static function searchable(): array;
    
    public function scopeSearch($query)
    {
        $page = request('page', 1);
        $limit = request('limit', 20);
        $orderBy = request('order_by', 'id');
        $orderDir = request('order_dir', 'desc');
        $filterValue = request('filter_value', null);
        $filterField = explode(',', request('filter_field', null));

        if($filterValue) {
            if($filterField && in_array($filterField, static::searchable())) {
                $query->where($filterField, 'LIKE', "%$filterValue%");
            }
            else {
                foreach(static::searchable() as $filter) {
                    $query->orWhere($filter, 'LIKE', "%$filterValue%");
                }
            }
        }

        if(!in_array($orderBy, static::searchable())) {
            $orderBy = 'id';
        }

        if(!in_array($orderDir, ['asc', 'desc'])) {
            $orderBy = 'desc';
        }

        return $query->orderBy($orderBy, $orderDir)->paginate($limit);
    }
}