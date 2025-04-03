# FMCG Brand Quiz Website

Interactive quiz platform for FMCG brands with badge rewards system.

## Deployment to Render.com

1. **Create a GitHub repository** with these files
2. **Connect to Render**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" and select "Web Service"
   - Connect your GitHub account
   - Select the repository you created
3. **Configure settings**:
   - Name: `fmcg-quiz`
   - Region: Choose closest to your audience
   - Branch: `main`
   - Root Directory: (leave blank)
   - Environment: `Static Site`
   - Build Command: (leave blank)
   - Publish Directory: `public`
4. **Deploy**:
   - Click "Create Web Service"
   - Your site will be live at the provided URL

## Customization

1. **Brand Colors**: Modify the CSS variables in `style.css`
2. **Questions**: Update the quiz data in `script.js`
3. **Badges**: Edit the SVG code in `script.js`
4. **Logo**: Replace the placeholder in `index.html`