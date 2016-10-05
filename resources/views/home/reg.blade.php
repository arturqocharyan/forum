@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                @if ($message = Session::get('success'))
		<div class="alert alert-success alert-block">
			<button type="button" class="close" data-dismiss="alert">×</button>
		        <strong>{{ $message }}</strong>
		</div>
		<img src="/avatar/{{ Session::get('path') }} " style="width: 200px; height: 150px";>
                @else
                    <img src="http://www.gravatar.com/avatar/5658ffccee7f0ebfda2b226238b1eb6e.jpg?s=80&d=monsterid&r=g" style="width: 200px; height: 150px";>
                @endif
                <form action="{{ url('PostAvatarUpload') }}" enctype="multipart/form-data" method="POST">
                    {{ csrf_field() }}
                    <div class="row">
                        <div class="col-md-12">
                            <input type="file" name="image" />
                        </div>
                        <div class="col-md-12">
                            <button type="submit" class="btn btn-success">Upload</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@endsection
