
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
<nav class="teal lighten-2">
    <div class="nav-wrapper container teal lighten-2">
        <a href="/" class="brand-logo">
            <img src="{{ asset('images/logo.png') }}" class="brand-logo" width="72" >
        </a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
            <li><a href="/">Home</a></li>
            <li><a href="/view_trees">All Trees</a></li>
            <li><a href="/add_trees">Add new Trees</a></li>
            <li><div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                </div></li>
        </ul>
    </div>
</nav>

<ul class="sidenav" id="mobile-demo">
    <li><a href="/">Home</a></li>
    <li><a href="/view_trees">All Trees</a></li>
    <li><a href="/add_trees">Add new Trees</a></li>
</ul>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelector('.sidenav');
        var instances = M.Sidenav.init(elems, {});
    });
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
@yield('navbar')
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>  -->
