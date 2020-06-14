<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tree;

class TreeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $trees = Tree::all();
    	return view('pages.view_trees',compact('trees'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $request = $request->getParsedBody();

        $filename = '';
        if($request->photo != null){
            $filename = time().'.'.$request->photo->getClientOriginalExtension();
            $request->photo->move(public_path('images'), $filename);
        }
        Tree::create([
            'name' => $request['name'],
            'species' => $request['species'] ?? 0,
            'latitude' => $request['latitude'],
            'longitude' => $request['longitude'],
            'diameter' => $request['diameter'] ?? 0,
            'pic' => $filename
        ]);

        
        return back()
    		->with('success','Details Uploaded successfully.');
            
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function view_in_map(Request $request){
        $trees=Tree::all();
        return $trees;

    }
}
