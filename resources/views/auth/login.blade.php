@extends('layouts.app')

@section('content')
<!-- Styles -->
<link href="{{ asset('css/login.css') }}" rel="stylesheet">
<div class="container-fluid main_body">

<div id="carouselExampleIndicators " class="carousel slide" data-ride="carousel" >
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <!-- <li data-target="#carouselExampleIndicators" data-slide-to="2"></li> -->
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
        <div class="bg-text1 animated mx-auto">
        <h2 class="slideInRight animated"><b>MORE</b>: <b>M</b>apping of <b>O</b>xygen <b>R</b>esources & <b>E</b>stimation</h2><br><br>
        <h3>Let’s make your natural assets digital <br> First ever platform to map your trees into your own GIS</h3><br>
        <button type="button" class="btn btn-primary slideInRight animated" data-toggle="modal" data-target="#exampleModalCenter" >
        Launch demo modal
            </button>
        </div>
    </div>
    <div class="carousel-item">
        <div class="bg-text1 animated mx-auto">
        <h2 class="slideInRight animated">MORE for better planet</h2>
        <h3>fast surveying, smart cartographic algorithm, automated analytical <br> report and much more for industries </h3><br>
        <button type="button" class="btn btn-primary slideInRight animated" data-toggle="modal" data-target="#exampleModalCenter" >
        Launch demo modal
            </button>
        </div>
    </div>
  </div>
  


</div>
    <!-- Modal -->
<div class="modal fade " id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle"><div class="typewriter_style">Way to the World of MORE</div></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
                <div class="modal-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label><br>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                    <label class="form-check-label" for="remember">
                                        {{ __('Remember Me') }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-12">
                                <button type="submit" class="btn btn-primary" style="width:100%;">
                                    {{ __('Login') }}
                                </button>
                                <br><br>
                                
                                

                                <!-- @if (Route::has('password.request'))
                                    <a class="btn btn-link" href="{{ route('password.request') }}">
                                        {{ __('Forgot Your Password?') }}
                                    </a>
                                @endif -->
                            </div>
                        </div>
                    </form>
                    <button type="submit" class="btn btn-primary" style="width:100%;">
                        Need your credentials?<b>Reach to Us</b>
                    </button>
                </div>
            </div>
        </div>
        <!-- </div> -->
    </div>
    </div>
</div>

@endsection
