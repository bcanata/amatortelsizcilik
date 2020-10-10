<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cache;

use App\Models\ExamCategory;
use App\Models\ExamQuestion;

Auth::routes();
Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});

Route::get('/sitemap', function() {

	$sitemap = App::make('sitemap');
	$sitemap->setCache('laravel.sitemap', 60);

	if (!$sitemap->isCached()) {

		$sitemap->add(URL::to('/'), '2012-08-25T20:10:00+02:00', '1.0', 'daily');

        $categories = ExamCategory::orderBy('created_at', 'desc')->get();
		foreach ($categories as $category) {
            $sitemap->add(route('questions', $category->id), $category->created_at->tz('UTC')->toAtomString(), '1.0', 'weekly', null);
		}

        $pages = TCG\Voyager\Models\Page::orderBy('created_at', 'desc')->get();
		foreach ($pages as $page) {
            $sitemap->add(route('page', $page->slug), $page->created_at->tz('UTC')->toAtomString(), '1.0', 'weekly', null);
		}
	}

	return $sitemap->render('xml');
});

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('questions/{category_id}', [App\Http\Controllers\QuestionController::class, 'index'])->name('questions');
Route::get('{slug}', [App\Http\Controllers\PageController::class, 'index'])->name('page');


// Route::prefix('exam')->group(function () {

//     Route::get('/', function () {
//         return view('exam.index');
//     })->name('exam');

// });
