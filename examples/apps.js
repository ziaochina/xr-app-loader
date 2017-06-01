export default function requireApp(path, cb) {
    
    if(path === 'apps/root'){
        cb( require('./apps/root/index'),
            require('./apps/root/action'),
            require('./apps/root/reducer'))
    }

    else if (path === 'apps/helloWorld') {
        cb( require('./apps/helloWorld/index'),
            require('./apps/helloWorld/action'),
            require('./apps/helloWorld/reducer')
        )
    }

    else if(path === 'apps/about'){
        cb( require('./apps/about/index'))
    }
}
