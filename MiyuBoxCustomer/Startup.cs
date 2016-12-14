using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MiyuBoxCustomer.Startup))]
namespace MiyuBoxCustomer
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
