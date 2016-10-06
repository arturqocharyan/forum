@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                
                <form action="{{ url('PostAvatarUpload/'. Auth::user()->id) }}" enctype="multipart/form-data" method="POST" class="form-horizontal">
                    {{ csrf_field() }}
                    <div class="panel-body ">
                        <div class="pull-left form-group col-md-4">
                             <div class=" form-group">
                                <div class="col-md-12">
                                    @if ($message = Session::get('success'))
                                       <div class="alert alert-success alert-block">
                                               <button type="button" class="close" data-dismiss="alert">×</button>
                                               <strong>{{ $message }}</strong>
                                       </div>
                                       <img src="/avatar/{{ Session::get('path') }} " style="width: 200px; height: 150px";>
                                       @else
                                           <img src="/avatar/{{ Auth::user()->avatar }} " style="width: 200px; height: 150px";>
                                       @endif
                                   <input type="file" class="form-control" name="image" />
                                   
                                </div>
                             </div>
                        </div>
                        <div class="pull-right form-group col-md-8">
                             <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                                 <label for="name" class="col-md-4 control-label">Name</label>
                                <div class="col-md-6">
                                    <input id="name" type="text" class="form-control" name="name" value="{{ Auth::user()->name }}" required autofocus>

                                    @if ($errors->has('name'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('name') }}</strong>
                                        </span>
                                    @endif
                                </div>
                             </div>
                            <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" name="email" value="{{ Auth::user()->email }}" required>
                                    @if ($errors->has('email'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('email') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-md-12">
                            <button type="submit" class="btn btn-success " >Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@endsection
