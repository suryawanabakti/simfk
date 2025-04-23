<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Student extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'tgl_lahir' => 'date',
        'has_change_password' => 'boolean',
        'jml_kakak' => 'integer',
        'jml_adik' => 'integer',
        'penghasilan_ayah' => 'integer',
        'penghasilan_ibu' => 'integer',
        'penghasilan_wali' => 'integer',
        'daya_listrik' => 'integer',
        'thn_masuk' => 'integer',
        'thn_lulus' => 'integer',
        'jml_mapel' => 'integer',
        'nilai' => 'integer',
        'no_ijazah' => 'integer',
        'tinggi' => 'integer',
        'berat' => 'integer',
        'tekanan_darah' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
