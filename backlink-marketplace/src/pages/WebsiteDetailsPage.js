import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { websiteSchema } from '../validation/websiteSchema';
import useWebsiteStore from '../store/websiteStore';

const WebsiteDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    setValue
  } = useForm();
  
  const websites = useWebsiteStore(state => state.websites);
  const currentWebsite = useWebsiteStore(state => state.currentWebsite);
  const addWebsite = useWebsiteStore(state => state.addWebsite);
  const updateWebsite = useWebsiteStore(state => state.updateWebsite);
  const setCurrentWebsite = useWebsiteStore(state => state.setCurrentWebsite);
  const persistWebsites = useWebsiteStore(state => state.persistWebsites);
  
  const isEditMode = !!id;
  const greyNicheCategories = [
    'Gambling', 'CBD', 'Pharma', 'Adult', 'Cryptocurrency', 'Payday Loans'
  ];
  
  // Initialize form with website data if in edit mode
  useEffect(() => {
    if (isEditMode && currentWebsite) {
      Object.entries(currentWebsite).forEach(([key, value]) => {
        setValue(key, value);
      });
      
      // Set niche offers
      greyNicheCategories.forEach(category => {
        setValue(`niche_${category}_guestPost`, currentWebsite.nicheOffers?.[category]?.guestPost);
        setValue(`niche_${category}_linkInsertion`, currentWebsite.nicheOffers?.[category]?.linkInsertion);
      });
    }
  }, [isEditMode, currentWebsite, setValue]);

  // Update the onSubmit function:
const onSubmit = (data) => {
    // Process niche offers
    const nicheOffers = {};
    greyNicheCategories.forEach(category => {
        nicheOffers[category] = {
        guestPost: data[`niche_${category}_guestPost`],
        linkInsertion: data[`niche_${category}_linkInsertion`]
        };
    });
    
    const websiteData = {
        ...data,
        nicheOffers,
        offersSummary: [
        data.guestPostPrice && 'Guest Posts',
        data.linkInsertionPrice && 'Link Insertions',
        data.homePagePrice && 'Homepage',
        ...greyNicheCategories.map(category => 
            (data[`niche_${category}_guestPost`] || data[`niche_${category}_linkInsertion`]) && `${category} Offers`
        ).filter(Boolean)
        ].filter(Boolean)
    };
    
    if (isEditMode) {
        updateWebsite({ ...websiteData, id });
    } else {
        addWebsite(websiteData);
    }
    
    navigate('/'); // Remove persistWebsites() call here
};
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {isEditMode ? 'Edit Website' : 'Add New Website'}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Section A: Website Details */}
        <div className="border-b border-gray-200 pb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Website Details</h3>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Website URL */}
            <div>
              <label className="form-label">Website URL *</label>
              <input
                type="text"
                className={`form-input ${errors.websiteUrl ? 'border-red-500' : ''}`}
                {...register('websiteUrl', websiteSchema.websiteUrl)}
              />
              {errors.websiteUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.websiteUrl.message}</p>
              )}
            </div>
            
            {/* Primary Language */}
            <div>
              <label className="form-label">Primary Language *</label>
              <select
                className={`form-input ${errors.primaryLanguage ? 'border-red-500' : ''}`}
                {...register('primaryLanguage', websiteSchema.primaryLanguage)}
              >
                <option value="">Select language</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
              {errors.primaryLanguage && (
                <p className="mt-1 text-sm text-red-600">{errors.primaryLanguage.message}</p>
              )}
            </div>
            
            {/* Country */}
            <div>
              <label className="form-label">Country *</label>
              <select
                className={`form-input ${errors.country ? 'border-red-500' : ''}`}
                {...register('country', websiteSchema.country)}
              >
                <option value="">Select country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
              </select>
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
              )}
            </div>
            
            {/* Categories */}
            <div>
              <label className="form-label">Categories</label>
              <input
                type="text"
                className="form-input"
                {...register('categories')}
                placeholder="Separate with commas"
              />
            </div>
            
            {/* Description */}
            <div className="sm:col-span-2">
              <label className="form-label">Description *</label>
              <textarea
                rows={4}
                className={`form-input ${errors.description ? 'border-red-500' : ''}`}
                {...register('description', websiteSchema.description)}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Section B: Offers */}
        <div className="border-b border-gray-200 pb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Offers</h3>
          
          {/* Normal Offers */}
          <div className="mb-8">
            <h4 className="text-md font-medium text-gray-700 mb-3">Normal Offers</h4>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="form-label">Guest Post Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className={`form-input ${errors.guestPostPrice ? 'border-red-500' : ''}`}
                  {...register('guestPostPrice', websiteSchema.guestPostPrice)}
                />
                {errors.guestPostPrice && (
                  <p className="mt-1 text-sm text-red-600">{errors.guestPostPrice.message}</p>
                )}
              </div>
              
              <div>
                <label className="form-label">Link Insertion Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className={`form-input ${errors.linkInsertionPrice ? 'border-red-500' : ''}`}
                  {...register('linkInsertionPrice', websiteSchema.linkInsertionPrice)}
                />
                {errors.linkInsertionPrice && (
                  <p className="mt-1 text-sm text-red-600">{errors.linkInsertionPrice.message}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Grey Niche Offers */}
          <div className="mb-8">
            <h4 className="text-md font-medium text-gray-700 mb-3">Grey Niche Offers</h4>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {greyNicheCategories.map(category => (
                <div key={category} className="border p-4 rounded-lg">
                  <h5 className="font-medium text-gray-700 mb-3">{category}</h5>
                  <div className="space-y-3">
                    <div>
                      <label className="form-label">Guest Post Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className={`form-input ${errors[`niche_${category}_guestPost`] ? 'border-red-500' : ''}`}
                        {...register(`niche_${category}_guestPost`, websiteSchema.guestPostPrice)}
                      />
                    </div>
                    
                    <div>
                      <label className="form-label">Link Insertion Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className={`form-input ${errors[`niche_${category}_linkInsertion`] ? 'border-red-500' : ''}`}
                        {...register(`niche_${category}_linkInsertion`, websiteSchema.linkInsertionPrice)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Home Page Offer */}
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-3">Home Page Offer</h4>
            <div className="grid grid-cols-1 gap-6">
              <div className="sm:col-span-1">
                <label className="form-label">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className={`form-input ${errors.homePagePrice ? 'border-red-500' : ''}`}
                  {...register('homePagePrice', websiteSchema.homePagePrice)}
                />
                {errors.homePagePrice && (
                  <p className="mt-1 text-sm text-red-600">{errors.homePagePrice.message}</p>
                )}
              </div>
              
              <div className="sm:col-span-2">
                <label className="form-label">Description *</label>
                <textarea
                  rows={3}
                  className={`form-input ${errors.homePageDescription ? 'border-red-500' : ''}`}
                  {...register('homePageDescription', websiteSchema.homePageDescription)}
                />
                {errors.homePageDescription && (
                  <p className="mt-1 text-sm text-red-600">{errors.homePageDescription.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Section C: Article Specifications */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Article Specifications</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="form-label">Minimum Word Count</label>
              <input
                type="number"
                className="form-input"
                {...register('minWordCount')}
              />
            </div>
            
            <div>
              <label className="form-label">Maximum Links</label>
              <input
                type="number"
                className="form-input"
                {...register('maxLinks')}
              />
            </div>
            
            <div className="sm:col-span-2">
              <label className="form-label">Content Guidelines</label>
              <textarea
                rows={4}
                className="form-input"
                {...register('contentGuidelines')}
              />
            </div>
            
            <div className="sm:col-span-2">
              <label className="form-label">Prohibited Topics</label>
              <input
                type="text"
                className="form-input"
                {...register('prohibitedTopics')}
                placeholder="Separate with commas"
              />
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            {isEditMode ? 'Update Website' : 'Add Website'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WebsiteDetailsPage;