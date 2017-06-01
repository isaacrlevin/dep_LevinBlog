using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.Service.Extensions;

namespace LevinBlog.Web.Identity
{
    // These values are used to setup the identity servcie and should not be changed
    public class IdentityServiceConstants
    {
        // Name of the single identity service tenant
        public const string Tenant = "IdentityService";

        // Unique ID of the single identity service tenant
        public const string TenantId = "9585A0CE-B33F-4E0D-B7E4-DB354F9F7FB4";

        // Default policy for the identity service
        public const string DefaultPolicy = "signinsignup";

        // Identity service version
        public const string Version = "2.0";

        // Identity service token version
        public const string TokenVersion = "1.0";

        // Identity service route prefex
        public const string RoutePrefix = IdentityServiceExtensionsClaimTypes.TrustFrameworkPolicy;
    }
}
